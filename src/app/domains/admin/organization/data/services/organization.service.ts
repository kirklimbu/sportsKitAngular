import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IOrganization } from '../models/organization/organization.model';

@Injectable({
  providedIn: 'root',
})
export class OrganizationService {
  apiUrl = environment.apiUrl;
  private readonly http = inject(HttpClient);

  // getFormValues;
  getFormValues(): Observable<IOrganization> {
    return this.http.get<IOrganization>(`${this.apiUrl}auth/org/form?`);
  }

  addOrganization(form: IOrganization) {
    const formData = new FormData();
    formData.append('form', JSON.stringify(form));
    formData.append('file', form.file);

    return this.http.post<IOrganization>(
      `${this.apiUrl}auth/org/save`,
      formData
    );
  }
}
