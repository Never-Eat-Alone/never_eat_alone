/** Routes related to stripe payments. */
export class StripePaymentRoutes {
  constructor(app: any, stripe: any) {
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
