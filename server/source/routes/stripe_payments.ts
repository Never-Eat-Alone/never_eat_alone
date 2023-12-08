import Stripe from 'stripe';
import { User, UserProfileImage } from '../../../client/library/source/definitions';
import { AttendeeDatabase } from '../postgres/queries/attendee_database';
import { DiningEventDatabase } from '../postgres/queries/dining_event_database';
import { UserDatabase } from '../postgres/queries/user_database';
import { UserProfileImageDatabase } from '../postgres/queries';

/** Routes related to stripe payments. */
export class StripePaymentRoutes {
  /**
   * @param app - Express app.
   * @param stripe - stripe api.
   * @param domainUrl - the absolute url address of the app.
   * @param userDatabase - The user related table manipulation class instance.
   * @param diningEventDatabase - The dining events related table manipulation 
   * @param userProfileImageDatabase
   * class instance.
   */
  constructor(app: any, stripe: any, domainUrl: string, userDatabase:
      UserDatabase, diningEventDatabase: DiningEventDatabase, attendeeDatabase:
      AttendeeDatabase, userProfileImageDatabase: UserProfileImageDatabase) {
    app.post('/api/create-setup-intent', this.createSetupIntent);
    app.post('/api/create-payment-intent', this.createPaymentIntent);
    app.post('/api/create-checkout-session', this.createCheckoutSession);
    app.get('/api/session-status', this.sessionStatus);
    app.get('/api/validate_and_join/:eventId', this.validatePaymentAndJoin);

    this.stripe = stripe;
    this.domainUrl = domainUrl;
    this.userDatabase = userDatabase;
    this.diningEventDatabase = diningEventDatabase;
    this.attendeeDatabase = attendeeDatabase;
    this.userProfileImageDatabase = userProfileImageDatabase;
  }

  private calculateOrderAmount = (items) => {
    // Replace this constant with a calculation of the order's amount
    // Calculate the order total on the server to prevent
    // people from directly manipulating the amount on the client
    return 500;
  };

  private createSetupIntent = async (request, response) => {
    try {
      const setupIntent = await this.stripe.setupIntents.create({
        customer: 'stripe_customer_id',
      });
      response.json({ clientSecret: setupIntent.client_secret });
    } catch (error) {
      response.status(400).send(error.message);
    }
  }

  private createPaymentIntent = async (request, response) => {
    const { items } = request.body;
    try {
      const paymentIntent = await this.stripe.paymentIntents.create({
        amount: this.calculateOrderAmount(items),
        currency: 'cad',
        automatic_payment_methods: {
          enabled: true,
        }
      });
      response.status(200).json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
      console.error('failed at /api/create-payment-intent post request:',
        error);
      response.status(400).send(error.message);
    }
  }

  private createCheckoutSession = async (request, response) => {
    if (!request.session?.user) {
      response.status(401).send();
      return;
    }
    let user: User;
    try {
      user = await this.userDatabase.loadUserBySessionId(request.session.id);
      if (user.id === -1) {
        response.status(401).send();
        return;
      }
    } catch (error) {
      console.error('Failed at loadUserBySessionId', error);
      response.status(500).send();
      return;
    }
    const quantity = parseInt(request.body.quantity);
    const eventId = parseInt(request.body.eventId);
    let priceId = '';
    try {
      priceId = await this.diningEventDatabase.loadPriceIdByEventId(eventId);
      if (!priceId) {
        response.status(404).json({
          message: 'Price ID not found for the specified Event ID'
        });
        return;
      }
    } catch (error) {
      console.error('Failed at loadPriceIdByEventId', error);
      response.status(500).send();
      return;
    }
    let checkoutSession; // Stripe.Checkout.Session;
    try {
      checkoutSession = await this.stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price: priceId,
            quantity: quantity,
          },
        ],
        mode: 'payment',
        success_url: `${this.domainUrl}/dining_events/${eventId}?Success=true&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${this.domainUrl}/dining_events/${eventId}?Cancel=true&session_id={CHECKOUT_SESSION_ID}`
      });
    } catch (error) {
      console.error('Failed at stripe.checkout.sessions', error);
      response.status(500).send();
      return;
    }

    try {
      await this.diningEventDatabase.savePaymentIntent(
        checkoutSession.payment_intent, checkoutSession.id, user.id, eventId);
    } catch (error) {
      console.error('Failed at savePaymentIntent', error);
      response.status(500).send();
      return;
    }
    response.status(200).json({
      url: checkoutSession.url,
      clientSecret: checkoutSession.client_secret,
      sessionId: checkoutSession.id
    });
  }

  private sessionStatus = async (request, response) => {
    const session = await this.stripe.checkout.sessions.retrieve(
      request.query.session_id);
    response.send({
      status: session.status,
      customer_email: session.customer_details.email
    });
  }

  private validatePaymentAndJoin = async (request, response) => {
    const eventId = parseInt(request.params.eventId);
    const sessionId = request.query.session_id;
    if (!sessionId) {
      return response.status(400).json({ error: 'Session ID is required.' });
    }
    let user = User.makeGuest();
    if (request.session?.user) {
      try {
        user = await this.userDatabase.loadUserBySessionId(request.session.id);
        if (user.id === -1) {
          response.status(401).send();
          return;
        }
      } catch (error) {
        console.error('Failed at loadUserBySessionId', error);
        response.status(500).send();
        return;
      }
    }
    let session: Stripe.Checkout.Session;
    try {
      session = await this.stripe.checkout.sessions.retrieve(sessionId);
    } catch (error) {
      console.error('Failed at retrieving session from Stripe', error);
      response.status(500).send();
      return;
    }
    if (session.payment_status !== 'paid') {
      response.status(400).json({ error: 'Payment failed.' });
      return;
    }
    let profileImageSrc = UserProfileImage.default(user.id).src;
    try {
      profileImageSrc = (await this.userProfileImageDatabase
        .loadProfileImageByUserId(user.id)).src;
    } catch (error) {
      console.error('Failed at loadProfileImageByUserId', error);
    }
    try {
      await this.attendeeDatabase.joinEvent(user.id, eventId);
      response.status(200).json({
        success: true,
        accountId: user.id,
        name: user.name,
        profileImageSrc: profileImageSrc
      });
    } catch (error) {
      console.error('Failed at joinEvent', error);
      response.status(500).send();
      return;
    }
  }

  /** Validate the payment status with stripe api. */
  private validatePaymentByIntentId = async (paymentIntentId: string) => {
    try {
      const paymentIntent = await this.stripe.paymentIntents.retrieve(
        paymentIntentId);
      if (paymentIntent.status === 'succeeded') {
        return { success: true, message: 'Payment successful' };
      } else if (paymentIntent.status === 'requires_action' ||
          paymentIntent.status === 'requires_payment_method') {
        return { success: false, message: 'Payment requires further action' };
      } else {
        return { success: false, message: 'Payment failed' };
      }
    } catch (error) {
      console.error('Error validating payment:', error);
      return { success: false, message: 'Error validating payment' };
    }
  }

  /** The stripe payment api. */
  private stripe: Stripe;
  private domainUrl: string;
  private userDatabase: UserDatabase;
  private diningEventDatabase: DiningEventDatabase;
  private attendeeDatabase: AttendeeDatabase;
  private userProfileImageDatabase: UserProfileImageDatabase;
}
