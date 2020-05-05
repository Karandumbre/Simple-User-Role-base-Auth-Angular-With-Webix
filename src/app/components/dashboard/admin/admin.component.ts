import { Component, OnInit, Input } from '@angular/core';
import { UserService } from 'src/app/Services/user.service';
declare var webix: any;
declare var $$: any;
declare var $: any;
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  @Input() UserData: any;
  public user = {
    email: '',
    fullName: '',
    phone: '',
    role: ['Normal']
  };
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.grid();
  }


  private grid() {
    return (webix.ui(
      {
        rows: [
          {
            cols: [{}, {
              view: 'datatable',
              id: 'mydatatable',
              editable: true,
              editaction: 'click',
              autoConfig: true, data: this.UserData.users, autoheight: true, autowidth: true,
              columns: [
                {
                  id: 'fullName', editor: 'text',
                  header: [{ text: 'Fullname' }, { content: 'textFilter', placeholder: 'Search' }], width: 160
                },
                { id: 'email', header: ['Email Id'], width: 200, sort: 'string' },
                { id: 'phone', editor: 'text', header: ['Phone Number'], width: 150 },
                { id: 'role', editor: 'text', header: ['Role'], width: 150 },
                { template: `<input class='savebtn btn btn-sm btn-success' type='button' value='Save'>`, header: ['Save'], width: 100 },
                { template: `<input class='delbtn btn btn-sm btn-danger' type='button' value='Delete'>`, header: ['Delete'], width: 100 }
              ], onClick: {
                delbtn: (event, cell, target) => {
                  const email = $$('mydatatable').getItemNode({ row: cell.row, column: 'email' }).innerHTML;
                  this.deleteUser(email);
                  webix.message('Delete row: ' + cell.row);
                  return false;
                },
                savebtn: (event, cell, target) => {
                  this.saveUserProfile($$('mydatatable').getItem(cell.row));
                }
              },

            }, {}],
          },
          {
            cols: [
              {}, {
                cols: [{ view: 'button', css: 'add-user', label: 'Add User', click: this.add_row }]
              }, {}
            ]

          }]
      }
    ));
  }

  sortByParam(a, b) {
    a = a.email;
    b = b.email;
    return a > b ? 1 : (a < b ? -1 : 0);
  }

  saveUserProfile(data) {
    const newData = {
      ...data,
      name: data.fullName,
      updatedEmail: data.email
    };
    delete newData.fullName;
    delete newData.id;
    this.userService.saveOrUpdateUserDetails(newData).subscribe((res) => {
      if (res.status === true) {
        webix.message('User Updated successfully');
      }
    }, err => {
      webix.message(this.errorHandler(err));
    });
  }

  errorHandler(err) {
    if (err.status === 422) {
      return err.error.join('<br/>');
    } else if (err.message && err.message.code === 11000) {
      return 'Duplicate Emails Found';
    } else {
      return 'Something went wrong.Please contact admin.';
    }
  }

  deleteUser(email) {
    this.userService.deleteUser(email).subscribe(res => {
      if (res.status === true) {
        alert(res.message);
      }
    });
  }

  add_row() {
    $('#usermodal').modal('show');
  }
}

