import { Discount } from 'src/app/api/articles.api';

export class ArticlesUtil {
  static calcCost(listPrice: number, vat: number, discounts: Discount[] = []): number {
    let totalDiscount = 0;
    if (discounts?.length) {
      totalDiscount = discounts.map(d => d.amount).reduce((a, b) => a + b);
    }
    const cost = listPrice * (1 + vat - totalDiscount);
    return parseFloat(cost.toFixed(2));
  }

  static calcPrice(cost: number, utility: number, transport: number) {
    const price = cost * (1 + utility + transport);
    return parseFloat(price.toFixed(2));
  }

  static calcCardPrice(price: number, card: number) {
    const cardPrice = price * (1 + card);
    return parseFloat(cardPrice.toFixed(2));
  }
}
