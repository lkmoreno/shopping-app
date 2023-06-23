import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { UsersService } from './services/users.service';
import { FilesService } from './services/files.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  imgParent = '';
  showImage = true;
  token = '';
  imgRta = '';


  constructor(
    private authService: AuthService,
    private usersService: UsersService,
    private filesService: FilesService,
  ) {

  }

  onLoaded(img: string) {
    //console.log('log padre', img)
  }
  toggleImg() {
    this.showImage = !this.showImage
  }

  createUser() {
    this.usersService.create({
      name: 'Juan',
      email: 'kenaa@example.com',
      password: '123456',
      avatar: "https://api.lorem.space/image/face?w=640&h=480&r=867"
    }).subscribe(res => {
      console.log(res)
    })
  }

  downloadPdf() {
    this.filesService.getFile('my.pdf', 'https://young-sands-07814.herokuapp.com/api/files/dummy.pdf',
      'application/pdf').subscribe()
  }

  onUpload(event:Event) {
    const element = event.target as HTMLInputElement;
    const file = element.files?.item(0);
    if(file){
      this.filesService.uploadFile(file).subscribe(res => {
        this.imgRta=res.location;
      })
    }

  }


}
