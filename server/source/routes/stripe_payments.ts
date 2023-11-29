import { User } from '../../../client/library/source/definitions';
import { UserDatabase } from '../postgres/queries/user_database';

/** Routes related to stripe payments. */
export class StripePaymentRoutes {
  /**
   * @param app - Express app.
   * @param stripe - stripe api.
   * @param userDatabase - The user related table manipulation class instance.
   */
  constructor(app: any, stripe: any, userDatabase: UserDatabase) {
    app.post('/api/create-setup-intent', this.createSetupIntent);
    app.post('/api/create-payment-intent', this.createPaymentIntent);
    app.post('/api/create-checkout-session', this.createCheckoutSession);
    app.get('/api/session-status', this.sessionStatus);

    this.stripe = stripe;
    this.userDatabase = userDatabase;
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
    const TEST_DOMAIN = 'http://localhost:3000';
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
    const { eventId, quantity } = request.body
    try {
      const session = await this.stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price: this.calculateOrderAmount(eventId),
            quantity: parseInt(quantity),
          },
        ],
        mode: 'payment',
        consent_collection: {
          terms_of_service: 'required',
        },
        success_url: `${TEST_DOMAIN}/${eventId}`,
        cancel_url: `${TEST_DOMAIN}/${eventId}`
      });
      response.status(200).json({ clientSecret: session.client_secret });
    } catch (error) {
      console.error('Failed at stripe.checkout.sessions', error);
      response.status(500).send();
      return;
    }
  }

  private sessionStatus = async (request, response) => {
    const session = await this.stripe.checkout.sessions.retrieve(
      request.query.session_id);
    response.send({
      status: session.status,
      customer_email: session.customer_details.email
    });
  }

  /** The stripe payment api. */
  private stripe: any;
  private userDatabase: UserDatabase;
}
