import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import {MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  loaiphongbenh = ['Nội trú', ' Ngoại trú'];
  thembenhnhanform!: FormGroup
  actionBtn:string = 'Save'
  constructor(private benhnhanform: FormBuilder,
    @Inject (MAT_DIALOG_DATA) public editdata: any,
     private api: ApiService,
      private dialogRef : MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {
    this.thembenhnhanform = this.benhnhanform.group({
      tenbenhnhan: ['', Validators.required],
      hokhau: ['', Validators.required],
      gioitinh: ['', Validators.required],
      ngaysinh: ['', Validators.required],
      phongbenh: ['', Validators.required],
      benh:['', Validators.required]
    })
    if(this.editdata){
      this.actionBtn = 'Update'
      this.thembenhnhanform.controls['tenbenhnhan'].setValue(this.editdata.tenbenhnhan)
      this.thembenhnhanform.controls['hokhau'].setValue(this.editdata.hokhau)
      this.thembenhnhanform.controls['gioitinh'].setValue(this.editdata.gioitinh)
      this.thembenhnhanform.controls['ngaysinh'].setValue(this.editdata.ngaysinh)
      this.thembenhnhanform.controls['phongbenh'].setValue(this.editdata.phongbenh)
      this.thembenhnhanform.controls['benh'].setValue(this.editdata.benh)
    }
  }
  addBenhnhan() {
   if(!this.editdata){
    if (this.thembenhnhanform.valid) {
      this.api.danhsachbenhnhanApi(this.thembenhnhanform.value).
        subscribe({
          next: (res) => {
            alert('Thêm thành công')
            this.thembenhnhanform.reset();
            this.dialogRef.close()
          },
          error: () => {
            alert('Thêm thất bại')
          }
        })
    }
   }else{
     this.updatedata()
   }
  }
  updatedata(){
    this.api.putdanhsachbenhnhanApi(this.thembenhnhanform.value , this.editdata.id).subscribe({
      next:(res)=>{
        alert("Update Succesfully")
        this.thembenhnhanform.reset()
        this.dialogRef.close('update')
      }
    })
  }
}
