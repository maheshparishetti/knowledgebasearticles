import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TreeNode } from 'primeng/api';

@Injectable()
export class NodeService {

    constructor(private http: HttpClient) {}

    getFilesystem() {
      return this.http.get<any>('/assets/filesystem.json')
        .toPromise()
        .then(res => <TreeNode[]>res.data);
      }
}
