import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { GlobalConstants } from '../global-constants';

@Directive({
  selector: '[appImageUpload]',
  standalone: true,

})
export class ImageUploadDirective {

  @Input() maxSize = GlobalConstants.maxFileSize; // 60kB in bytes
  @Output() imageUploaded = new EventEmitter<any>();
  @Output() imageUrl = new EventEmitter<string>() || null;
  @Output() fileType = new EventEmitter<string>() || null || undefined;


  @HostListener('change', ['$event.target.files']) handleImageUpload(files: FileList) {


    console.log('file name', files);
    const file = files.item(0);
    if (!file) return;

    const _fileType = this.getFileType(file);
    if (!_fileType) return;
    console.log(_fileType);
    this.fileType.emit(_fileType);






    // Check file type
    // if (!GlobalConstants.allowedFileTypes.includes(file.type)) {
    //   alert('Invalid file type. Only PNG, JPEG ,wav, mp3 are allowed.');
    //   return;
    // }

    // Check file size
    if (file.size > GlobalConstants.maxFileSize) {
      alert('File size exceeds limit. Maximum allowed size is 60kb.');
      return;
    }


    console.log('below if');

    const reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl.emit(event.target.result);
    }
    reader.readAsDataURL(file);

    // Emit event with file object
    this.imageUploaded.emit(file);
  }

  private getFileType(file: File): string | null | undefined {
    const mimeType = file.type;
    const validImageTypes = GlobalConstants.allowedImageTypes;
    const validAudioTypes = GlobalConstants.allowedAudioTypes;

    if (validImageTypes.includes(mimeType)) {
      return 'Image';
    } else if (validAudioTypes.includes(mimeType)) {
      return 'MP3';
    } else {
      alert('Invalid file type. Only PNG, JPEG ,wav, mp3 are allowed.');
      return;

    }
  }

}
