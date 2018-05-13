import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Address Book';
  count = 0;
  addressBookHeaders: string[];
  addressBook: { id: number, firstName: string, lastName: string, department: string, phoneNumber: string }[];
  addressBookTemp: { id: number, firstName: string, lastName: string, department: string, phoneNumber: string }[];
  firstName: string;
  lastName: string;
  department: string;
  phoneNumber: string;
  firstNameSearch: string;
  lastNameSearch: string;
  departmentSearch: string;
  search: boolean = false;
  constructor() { }

  ngOnInit(): void {
    this.addressBookHeaders = ['First Name', 'Last Name', 'Department', 'Phone Number', 'Delete'];
    this.addressBook = [];
  }

  addNewEmployee() {
    if (this.search) {
      this.search = false;
      this.addressBook = this.addressBookTemp;
    }
    this.count++;
    let employee: { id: number, firstName: string, lastName: string, department: string, phoneNumber: string } = {
      id: this.count,
      firstName: this.firstName,
      lastName: this.lastName,
      department: this.department,
      phoneNumber: this.phoneNumber
    };

    this.addressBook.push(employee);
    this.addressBook.sort((a, b) => {
      if ( a.lastName < b.lastName )
        return -1;
      if ( a.lastName > b.lastName )
        return 1;
      return 0;
    });
  }

  searchEmployee() {
    if (this.search) {
      this.search = false;
      this.addressBook = this.addressBookTemp;
    } else {
      this.addressBookTemp = this.addressBook;
    }
    this.search = true;
    this.addressBook = []
    let search;
    this.addressBookTemp.forEach((employee) => {
      search = true;
      if (!!this.firstNameSearch) {
        if (employee.firstName === this.firstNameSearch)
          search = true;
        else
          search = false;
      }
      if (!!this.lastNameSearch && search) {
        if (employee.lastName === this.lastNameSearch)
          search = true;
        else
          search = false;
      }
      if (!!this.departmentSearch && search) {
        if (employee.department === this.departmentSearch)
          search = true
        else
          search = false;
      }
      if (search) {
        this.addressBook.push(employee)
      }
    })
  }

  cancelSearch() {
    if (this.search) {
      this.search = false;
      this.addressBook = this.addressBookTemp;
    }
  }

  deleteEmployee(id, index) {
    this.count--;
    if (this.search) {
      this.addressBookTemp.splice(this.getElement(this.addressBookTemp, id), 1);
      this.addressBook.splice(index, 1);
    } else {
      this.addressBook.splice(this.getElement(this.addressBook, id), 1);
    }
  }

  getElement(collection, id) {
    let i;
    for (i = 0; i < collection.length; i++) {
      if (collection[i].id === id) {
        return i;
      }
    }
  }

  clearFields() {
    this.firstName = '';
    this.lastName = '';
    this.department = '';
    this.phoneNumber = '';
  }
}
