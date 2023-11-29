/** Routes related to stripe payments. */
export class StripePaymentRoutes {
  constructor(app: any, stripe: any) {
    app.post('/api/create-setup-intent', this.createSetupIntent);
    app.post('/api/create-payment-intent', this.createPaymentIntent);
    app.post('/api/create-checkout-session', this.createCheckoutSession);
    app.get('/api/session-status', this.sessionStatus);

    this.stripe = stripe;    
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
      console.log('paymentIntent', paymentIntent);
      console.log('client_secret', paymentIntent.client_secret);
      response.status(200).json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
      console.error('failed at /api/create-payment-intent post request:',
        error);
      response.status(400).send(error.message);
    }
  }

  private createCheckoutSession = async (request, response) => {
    const TEST_DOMAIN = 'http://localhost:3000';
    const session = await this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'setup',
      ui_mode: 'embedded',
      success_url: `${TEST_DOMAIN}/return?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: 'https://nevereatalone.net'
    });
  
    console.log('stripe session', session);
    response.send({ clientSecret: session.client_secret });
  }

  private sessionStatus = async (request, response) => {
    const session = await this.stripe.checkout.sessions.retrieve(
      request.query.session_id);
    console.log('session.status', session.status, session.customer_details.email);
    response.send({
      status: session.status,
      customer_email: session.customer_details.email
    });
  }

  /** The stripe payment api. */
  private stripe: any;
}
