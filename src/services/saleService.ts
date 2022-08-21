import api, { EndPoints } from 'api/axios';
import { SaleType } from 'models/sale-type';
export async function getSalesAxios() {
  return await api.get<SaleType[]>(EndPoints.sales);
}
/* Other commonly-used api methods:
api.post
api.put
api.delete
api.patch
*/
/* The < > bracket here is a Generic type that Typescript adapted from OOP.
It means that the return value of the getSalesAxios is an array of 
SaleType.
This would likewise help us with the TypeScript intell-sense when using it.
*/
