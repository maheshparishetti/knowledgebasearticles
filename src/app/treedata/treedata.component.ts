import { Component, OnInit } from '@angular/core';
import { TreeNode, MenuItem, MessageService } from 'primeng/api';
// import { tree } from 'primeng/treetable';
import { NodeService } from '../node.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import * as _ from 'lodash';
@Component({
  selector: 'app-treedata',
  templateUrl: './treedata.component.html',
  styleUrls: ['./treedata.component.css']
})
export class TreedataComponent implements OnInit {
  files: any;
  display: boolean = false;
  selectedNode: TreeNode;
  AddForm: FormGroup;
  cols: any[];
  node: TreeNode;
  items: MenuItem[];
  selectedColumns: any[];
  result;
  parent: TreeNode;
  tree: any;
  constructor(private nodeService: NodeService, private messageService: MessageService, private fb: FormBuilder) { }

  ngOnInit() {
    this.getdata()
    this.AddForm = this.fb.group({
      name: new FormControl(null,Validators.required),
      size: new FormControl(null),
      type: new FormControl(null),
    });


    this.cols = [
      { field: 'name', header: 'Name' },
      { field: 'size', header: 'Size' },
      { field: 'type', header: 'Type' }
    ];
    this.selectedColumns = this.cols;

    this.items = [
      { label: 'View', icon: 'pi pi-search', command: (event) => this.viewFile(this.selectedNode) },
      { label: 'Toggle', icon: 'pi pi-sort', command: (event) => this.toggleFile(this.selectedNode) },
      { label: 'add', icon: 'pi pi-plus', command: (event) => this.opendialog(this.selectedNode) },
      { label: 'delete', icon: 'pi pi-plus', command: (event) => this.deletedialog(this.selectedNode) }
    ];
  }


  getdata() {
    this.nodeService.getFilesystem().then(files => {
      this.files = files;
      console.log(this.files);
    });
  }

  viewFile(node) {
    this.messageService.add({ severity: 'info', summary: 'File Selected', detail: node.data.name + ' - ' + node.data.size });
  }

  toggleFile(node) {
    node.expanded = !node.expanded;
    this.files = [...this.files];
  }

  opendialog(node) {
    this.node = node;
    console.log(this.node);
    this.display = true;
  }

  OnAddArticleSave() {
    console.log(this.AddForm.status);
    // tslint:disable-next-line: triple-equals
    if (this.AddForm.status == 'VALID') {
      this.result = {
        data: {
          "name": this.AddForm.value.name,
          "size": this.AddForm.value.size,
          "type": this.AddForm.value.type,
        },
        children: []
      }
      this.node['children'].push(this.result);

      this.display = false;
      this.AddForm.reset();
    } else {
      alert('Form is invalid,data not added');
      this.display = false;
    }
  }

  deletedialog(node) {
    // if (node["chidren"] != undefined || node["chidren"] != "" || node["chidren"].length != undefined) {
    //   var test = node["children"];
    //   var result = _.filter(node["children"], n => {
    //     return n.name === node.data.name;
    //   });
    //   node["children"] = result;

    // }
    // var result1 = _.filter(node["data"], n => {
    //   return n.name === node.data.name;
    // });
    // node["data"] = result1;
    // delete node.data;

    if (node && node.parent) {
      let index = node.parent.children.indexOf(node);
      node.parent.children.splice(index, 1);
      this.tree.treeModel.update();
      // console.log("Selected child deleted in",this.filesTree2);
    }
    else {
      // let i = node.data.id;
      // node = _.filter(node.children, (n) => {
      //   return (n.parentId !== i);
      // });
      node = this.deleteNode(node, node);
    }


    // if (node && node["parent"]) {
    //   let index = node["parent"].children.indexOf(node);
    //   node["parent"].children.splice(index, 1);
    //   console.log('Selected child deleted in', node);
    // }


  }
  deleteNode(node, tree){
    let parentNode = node.realParent ? node.realParent : node.treeModel.virtualRoot;
          _.remove(parentNode.data.children, function (child) {
              return child === node.data;
          });
          tree.treeModel.update();
          if (node.parent.data.children.length === 0) {
              node.parent.data.hasChildren = false;
          }
    }
  // deleteNode(topNode: any, selectedNode: any) {
  //   if (topNode.children != null) {
  //     var i;
  //     for (i = 0; i < topNode.children.length; i++) {
  //       if (topNode.children[i].data.id === selectedNode.data.id) {
  //         topNode.children.splice(i, 1);
  //         topNode = [];
  //         return;
  //       }
  //       else this.deleteNode(topNode.children[i], selectedNode);
  //     }
  //   }
  //   else return;
  // }
}

// import { Component, OnInit } from '@angular/core';
// import { TreeNode, MessageService, MenuItem } from 'primeng/api';

// import { Team3Service } from '../team3.service';
// import { Articles } from '../article';


// @Component({
//   selector: 'app-treedata',
//   templateUrl: './treedata.component.html',
//   styleUrls: ['./treedata.component.css']
// })
// export class TreedataComponent implements OnInit {
//   files: TreeNode[];
//   selectArticles:Articles[];
//   selectedNode: TreeNode;
//   arr:Articles[];
//   cols: any[];

//   items: MenuItem[];

//   constructor(private data: Team3Service, private messageService: MessageService) { }

//   ngOnInit() {
//     this.getAll();

//     this.cols = [
//       { field: 'articleId', header: 'Article Id' },
//       { field: 'articleName', header: 'Article Name' },
//       { field: 'content', header: 'Content' },
//       { field: 'createdBy', header: 'Created By' },
//       { field: 'categoryName', header: 'Category Name' }
//       // { field: 'color', header: 'Color' }
//     ];

//     this.items = [
//         { label: 'View', icon: 'pi pi-search', command: (event) => this.viewFile(this.selectedNode) },
//         { label: 'Toggle', icon: 'pi pi-sort', command: (event) => this.toggleFile(this.selectedNode) }
//     ];
//   }
//   getAll() {
//     this.data.getAllData().subscribe(
//       (data: Articles[]) => {
//         this.arr = data;
//         this.selectArticles = this.arr['kbArticles'];
//         console.log(this.selectArticles);
//       });
//     }
//   viewFile(node) {
//     this.messageService.add({ severity: 'info', summary: 'File Selected', detail: node.data.name + ' - ' + node.data.size });
// }

// toggleFile(node) {
//     node.expanded = !node.expanded;
//     this.files = [...this.files];
// }
// }

