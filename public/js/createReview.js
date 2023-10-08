import axios from 'axios';
import { showAlert } from './alerts';

export const createreview = async (review, rating, slug) => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://127.0.0.1:3000/api/v1/reviews',
      data: {
        review,
        rating,
        slug,
      },
    });
    if (res.data.status === 'success') {
      showAlert('success', 'Review submitted successfully');
      window.setTimeout(() => {
        location.assign(`/tour/${slug}`);
      }, 1500);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
