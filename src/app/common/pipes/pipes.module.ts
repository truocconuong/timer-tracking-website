import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HasItemPipe } from './has-item/has-item.pipe';
import { CustomDatePipe } from './custom-date/custom-date.pipe';
import { LengthPipe } from './length/length.pipe';
import { FilterByPipe } from './filter-by/filter-by.pipe';
import { FindByPipe } from './find-by/find-by.pipe';
import { IsArrayPipe } from './is-array/is-array.pipe';
import { OrderByPipe } from './order-by/order-by.pipe';
import { SumByPipe } from './sum-by/sum-by.pipe';
import { FlatMapPipe } from './flat-map/flat-map.pipe';
import { ArrayKeyValue } from './array-key-value/array-key-value.pipe';
import { ConvertToTree } from './convert-to-tree/convert-to-tree.pipe';
@NgModule({
  imports: [CommonModule],
  exports: [HasItemPipe, CustomDatePipe, LengthPipe, FilterByPipe, IsArrayPipe, OrderByPipe, SumByPipe, FlatMapPipe, ArrayKeyValue, ConvertToTree, FindByPipe],
  declarations: [HasItemPipe, CustomDatePipe, LengthPipe, FilterByPipe, IsArrayPipe, OrderByPipe, SumByPipe, FlatMapPipe, ArrayKeyValue, ConvertToTree, FindByPipe]
})
export class PipesModule {}
