import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  weight: number = 0
  height: number = 0
  imc: number = 0

  constructor(private toastCtrl: ToastController) {}

  onCalculate() {
    if (this.height <= 0 || this.weight <= 0) {
      return
    }
    
    this.imc = this.weight / (this.height * this.height)
    this.showIMC()
  }

  async showIMC() {
    const info = this.getIMCInfo(+this.imc.toFixed(2))
    const toast = await this.toastCtrl.create({
      message: `IMC = ${this.imc.toFixed(2)} - ${info.msg}`,
      duration: 3000,
      color: info.color
    })
    
    toast.present()

  }

   getIMCInfo(imc : number){
    if (imc > 40 ){
      return {color: 'danger', msg: 'OBESIDADE GRAVE'}
    } else if(imc >= 30){
      return {color: 'danger', msg: 'OBESIDADE'}
    } else if(imc >= 25){
      return {color: 'warning', msg: 'SOBREPESO'}
    }else if(imc >= 18.5){
      return {color: 'success', msg: 'NORMAL'}
    }else if( imc < 18.5){
      return {color: 'secondary', msg: 'MAGREZA'}
    }

    return {color: 'primary', msg: 'Houve um erro ao calcular o IMC'}
  }
}
