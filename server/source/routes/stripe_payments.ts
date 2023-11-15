/** Routes related to stripe payments. */
export class StripePaymentRoutes {
  constructor(app: any, stripe: any) {

    app.post('/api/create-setup-intent', async (request, response) => {
      try {
        const setupIntent = await stripe.setupIntents.create({
          customer: 'stripe_customer_id',
        });
        response.json({ clientSecret: setupIntent.client_secret });
      } catch (error) {
        response.status(400).send(error.message);
      }
    });

    app.post('/api/create-payment-intent', async (request, response) => {
      const { amount } = request.body;
      try {
        const paymentIntent = await stripe.paymentIntents.create({
          amount,
          currency: 'cad',
        });
        response.json({ clientSecret: paymentIntent.client_secret });
      } catch (error) {
        console.error('failed at /api/create-payment-intent post request:',
          error);
        response.status(400).send(error.message);
      }
    });
  }

  /** The stripe payment api. */
  private stripe: any;
}
