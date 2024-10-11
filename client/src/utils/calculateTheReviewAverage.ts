import type { Review } from '../interfaces/phone/Review';

export default function calculateTheReviewAverage(reviews: Review[]): number {
    const total = reviews.reduce((acc, review) => acc + review.rating, 0);
    return total / reviews.length;
}
    