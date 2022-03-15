// import { MatTableDataSource } from '@angular/material/table';

// export class NestedObjectsDataSource extends MatTableDataSource<MyObjectType> {
//   constructor() {
//     super();
//   }

//   public sortingDataAccessor: (
//     data: WorkingHours,
//     sortHeaderId: string
//   ) => string | number = (
//     data: WorkingHours,
//     sortHeaderId: string
//   ): string | number => {
//     let value = null;

//     if (sortHeaderId.indexOf('.') !== -1) {
//       const ids = sortHeaderId.split('.');

//       value = data[ids[0]][ids[1]];
//     } else value = data[sortHeaderId];

//     return _isNumberValue(value) ? Number(value) : value;
//   };
// }
