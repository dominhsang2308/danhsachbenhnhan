import { Component, Inject, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  loaiphongbenh = ['Nội trú', ' Ngoại trú'];
  // thembenhnhanform!: FormGroup
  actionBtn: string = 'Save';
  titleaction: string = 'Thêm bệnh nhân';
  constructor(
    private benhnhanform: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public editdata: any,
    private api: ApiService,
    private dialogRef: MatDialogRef<DialogComponent>
  ) {}
  thembenhnhanform = new FormGroup({
    tenbenhnhan: new FormControl('',[Validators.required]),
    hokhau: new FormControl('',[Validators.required]),
    gioitinh: new FormControl('',[Validators.required]),
    ngaysinh: new FormControl('',[Validators.required]),
    phongbenh: new FormControl('',[Validators.required]),
    benh: new FormControl('',[Validators.required]),
  });
  ngOnInit(): void {
    // this.thembenhnhanform = this.benhnhanform.group({
    //   tenbenhnhan: ['', Validators.required],
    //   hokhau: ['', Validators.required],
    //   gioitinh: ['', Validators.required],
    //   ngaysinh: ['', Validators.required],
    //   phongbenh: ['', Validators.required],
    //   benh:['', Validators.required]
    // })
   
    if (this.editdata) {
      this.actionBtn = 'Update';
      this.titleaction = 'Sửa bệnh nhân';
      this.thembenhnhanform.controls['tenbenhnhan'].setValue(
        this.editdata.tenbenhnhan
      );
      this.thembenhnhanform.controls['hokhau'].setValue(this.editdata.hokhau);
      this.thembenhnhanform.controls['gioitinh'].setValue(
        this.editdata.gioitinh
      );
      this.thembenhnhanform.controls['ngaysinh'].setValue(
        this.editdata.ngaysinh
      );
      this.thembenhnhanform.controls['phongbenh'].setValue(
        this.editdata.phongbenh
      );
      this.thembenhnhanform.controls['benh'].setValue(this.editdata.benh);
    }
  }
  //Thêm bệnh nhân
  addBenhnhan() {
    if (!this.editdata) {
      if (this.thembenhnhanform.valid) {
        this.api.danhsachbenhnhanApi(this.thembenhnhanform.value).subscribe({
          next: (res) => {
            alert('Thêm thành công');
            this.thembenhnhanform.reset();
            this.dialogRef.close();
          },
          error: () => {
            alert('Thêm thất bại');
          },
        });
      }
    } else {
      this.updatedata();
    }
  }
  onSubmit(){
    this.thembenhnhanform.invalid
  }
  updatedata() {
    this.api
      .putdanhsachbenhnhanApi(this.thembenhnhanform.value, this.editdata.id)
      .subscribe({
        next: (res) => {
          alert('Update Succesfully');
          this.thembenhnhanform.reset();
          this.dialogRef.close('update');
        },
      });
  }
}
