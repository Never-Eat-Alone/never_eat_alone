/** Routes related to stripe payments. */
export class StripePaymentRoutes {
  constructor(app: any, stripe: any) {
    app.post('/api/create-setup-intent', this.createSetupIntent);
    app.post('/api/create-payment-intent', this.createPaymentIntent);
    app.post('/create-checkout-session', async (req, res) => {
      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            price: '{{PRICE_ID}}',
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: 'https://nevereatalone.net',
        cancel_url: 'https://nevereatalone.net',
        automatic_tax: {enabled: true},
      });

      res.redirect(303, session.url);
    });

    this.stripe = stripe;    
  }

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
    const { amount } = request.body;
    try {
      const paymentIntent = await this.stripe.paymentIntents.create({
        amount,
        currency: 'cad',
      });
      response.json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
      console.error('failed at /api/create-payment-intent post request:',
        error);
      response.status(400).send(error.message);
    }
  }

  /** The stripe payment api. */
  private stripe: any;
}
