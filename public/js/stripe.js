import axios from 'axios';
import { showAlert } from './alerts';
const stripe = Stripe(
  'pk_test_51NwWZdGCZH66dhHWPSpOAujf2svArcSTnwP5bKxR2gyimlrcQ6DCe9b6ACSFNqEsftmMW3du9L2GQM6qDGcoYvW7008d15dcOD'
);

export const bookTour = async (tourId) => {
  try {
    //get checkout session from api
    const session = await axios(
      `http://127.0.0.1:3000/api/v1/bookings/checkout-session/${tourId}`
    );
    console.log(session);
    //create checkout form + charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
