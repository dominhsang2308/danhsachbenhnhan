import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { ApiService } from './services/api.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Crud';
  displayedColumns: string[] = ['tenbenhnhan', 'hokhau', 'gioitinh', 'ngaysinh', 'phongbenh', 'benh', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog, private api: ApiService) {

  }
  ngOnInit(): void {
    this.getallbenhnhanList()
  }
  openDialog() {
    this.dialog.open(DialogComponent, {
      width: '30%',
    }).afterClosed().subscribe(val => {
      if (val === 'save') {
        this.getallbenhnhanList()
      }
    })
  }
  getallbenhnhanList() {
    this.api.getdanhsachbenhnhanApi().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort
      },
      error: (error) => {
        console.log(error)
      }
    })
  }
  editBenhNhan(row: any) {
    this.dialog.open(DialogComponent, {
      width: '30%',
      data: row
    }).afterClosed().subscribe(val => {
      if (val === 'update') {
        this.getallbenhnhanList()
      }
    })
  }
  deletebenhnhan(id: number) {
    this.api.deletedanhsachbenhnhanApi(id).
      subscribe({
        next: (res) => {
          alert('Xóa thành công')
          this.getallbenhnhanList()
        },
        error: () => {
          alert('Xóa thất bại')
        }
      })
  }
  //Filter data
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
// Language: typescript
