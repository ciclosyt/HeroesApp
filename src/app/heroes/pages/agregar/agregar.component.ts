import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Heroe, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { switchMap } from 'rxjs/operators'
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [`
  
  img{
    width: 100%;
    border-radius: 5px;
  }
  .alturaMax {
    max-height: 360px;
  }

  `
  ]
})
export class AgregarComponent implements OnInit {


  publishers = [
    {
      id:'DC Comics',
      desc: 'DC - Comics'
    },
    {
      id:'Marvel Comics',
      desc: 'Marvel - Comics'
    }
  ]

  heroe: Heroe = {
    superhero:'',
    alter_ego:'',
    characters:'',
    first_appearance: '',
    publisher: Publisher.DCComics,
    alt_img:'',
  }




  constructor( private heroeService: HeroesService,
               private activatedRouted: ActivatedRoute,
               private router: Router,
               private _snackBar: MatSnackBar,
               public dialog: MatDialog ) { }

            
               



  ngOnInit(): void {

   if( !this.router.url.includes('editar')) {
    return;
  }
  
  this.activatedRouted.params
  .pipe(
    switchMap( ({id}) => this.heroeService.getHeroePorId( id ) )
  )
    .subscribe( heroe => this.heroe = heroe);



  }


  guardar(){
    

    if(this.heroe.superhero.trim().length === 0){
      return;
    }

    if (this.heroe.id){
      //actualizar
      this.heroeService.actualizarHeroe( this.heroe )
        .subscribe( heroe => this.mostrarSnackBar('registro actualizado'))
    } else{
      //nuevo registro
      this.heroeService.agregarHeroe( this.heroe )
            .subscribe( resp => {
              this.router.navigate(['/heroes/editar', resp.id])
              this.mostrarSnackBar('Registro creado')
               })


    }
    
  }

  borrar() {

    const dialog =  this.dialog.open( ConfirmarComponent, {

      width: '250px',
      data: {...this.heroe}
    } );

    dialog.afterClosed().subscribe(
      (result) => {
        
        this.heroeService.borrarHeroe( this.heroe.id!)
        .subscribe( x => {
    
          this.router.navigate(['/heroes']);
    
        } )



      }
    )

    
}

mostrarSnackBar( mensaje: string ){


  this._snackBar.open( mensaje, 'ok!', {

    duration: 2500


  } );



}


}

