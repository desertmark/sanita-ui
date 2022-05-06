import { Discount, Article, ArticleRequestBody } from 'src/app/api/articles.api';
import { ArticlesValues } from './articles.model';
import { ArticlesDetailsValues } from '../article-details/article-details.model';

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

  static toArticleRequestBody(values: ArticlesDetailsValues): ArticleRequestBody {
    return {
      codeString: values.codeStringField,
      listPrice: values.listPriceField,
      categoryId: values.categoryIdField as string,
      dolar: 1,
      description: values.descriptionField,
      utility: values.utilityField / 100,
      vat: values.vatField / 100,
      transport: values.transportField / 100,
      card: values.cardField / 100,
      cost: values.costField,
      price: values.priceField,
      cardPrice: values.cardPriceField,
      discounts: this.toDiscount(values.discountFields)
    };
  }

  static toDiscount(discounts: Discount[]) {
    return discounts?.map(disc => {
      disc.amount = disc.amount / 100;
      return disc;
    });
  }

  static toArticleDetailsValues(article: Article): ArticlesDetailsValues {
    return {
      codeStringField: article.codeString,
      descriptionField: article.description,
      priceField: article.price,
      costField: article.cost,
      dolarField: article.dolar,
      utilityField: this.toPercentage(article.utility),
      listPriceField: article.listPrice,
      vatField: this.toPercentage(article.vat),
      transportField: this.toPercentage(article.transport),
      cardField: this.toPercentage(article.card),
      cardPriceField: article.cardPrice,
      categoryIdField: article.category.id,
      categoryIdFieldOption: article.category,
      discountFields: this.toDiscountArticleDetailsValues(article.discounts)
    };
  }

  static toDiscountArticleDetailsValues(discount: Discount[]) {
    return discount?.map(disc => {
      disc.amount = this.toPercentage(disc.amount);
      return disc;
    });
  }

  static toPercentage(value: number) {
    const percentage = value * 100;
    return parseFloat(percentage.toFixed(2));
  }
}

