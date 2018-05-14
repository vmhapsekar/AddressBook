import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'Address Book'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Address Book');
  }));
  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to Address Book!');
  }));
  it('should add an employee', async(() => {
    const component = new AppComponent();
    component.firstName = 'First Name';
    component.lastName = 'Last Name';
    component.department = 'Department';
    component.phoneNumber = '423456754';
    component.ngOnInit();
    expect(component.addressBookHeaders).toEqual(['First Name', 'Last Name', 'Department', 'Phone Number', 'Delete'])
    expect(component.addressBook).toEqual([]);
    component.addNewEmployee()
    expect(component.addressBook).toEqual([
      {
        "id": 1,
        "firstName": "First Name",
        "lastName": "Last Name",
        "department": "Department",
        "phoneNumber": "423456754"
      }
    ]);
  }));
  it('should delete an employee', async(() => {
    const component = new AppComponent();
    component.addressBook= [
      {
        "id": 1,
        "firstName": "First Name",
        "lastName": "Last Name",
        "department": "Department",
        "phoneNumber": "423456754"
      }
    ];
    component.deleteEmployee(1, 1);
    expect(component.addressBook).toEqual([]);
  }));
  it('should search for an employee based on first name', async(() => {
    const component = new AppComponent();
    component.addressBook= [
      {
        "id": 1,
        "firstName": "Steve",
        "lastName": "Johnson",
        "department": "CS",
        "phoneNumber": "423456754"
      },
      {
        "id": 2,
        "firstName": "Jack",
        "lastName": "Douglas",
        "department": "IT",
        "phoneNumber": "423456754"
      }
    ];
    component.firstNameSearch = 'Steve';
    component.searchEmployee();
    expect(component.addressBook).toEqual([{
      "id": 1,
      "firstName": "Steve",
      "lastName": "Johnson",
      "department": "CS",
      "phoneNumber": "423456754"
    }]);
  }));
  it('should search for an employee based on last name', async(() => {
    const component = new AppComponent();
    component.addressBook= [
      {
        "id": 1,
        "firstName": "Steve",
        "lastName": "Johnson",
        "department": "CS",
        "phoneNumber": "423456754"
      },
      {
        "id": 2,
        "firstName": "Jack",
        "lastName": "Douglas",
        "department": "IT",
        "phoneNumber": "423456754"
      }
    ];
    component.lastNameSearch = 'Johnson';
    component.searchEmployee();
    expect(component.addressBook).toEqual([{
      "id": 1,
      "firstName": "Steve",
      "lastName": "Johnson",
      "department": "CS",
      "phoneNumber": "423456754"
    }]);
  }));
  it('should search for an employee based on department', async(() => {
    const component = new AppComponent();
    component.addressBook= [
      {
        "id": 1,
        "firstName": "Steve",
        "lastName": "Johnson",
        "department": "CS",
        "phoneNumber": "423456754"
      },
      {
        "id": 2,
        "firstName": "Jack",
        "lastName": "Douglas",
        "department": "IT",
        "phoneNumber": "423456754"
      }
    ];
    component.departmentSearch = 'CS';
    component.searchEmployee();
    expect(component.addressBook).toEqual([{
      "id": 1,
      "firstName": "Steve",
      "lastName": "Johnson",
      "department": "CS",
      "phoneNumber": "423456754"
    }]);
  }));
  it('should sort employee list', async(() => {
    const component = new AppComponent();
    component.addressBook= [
      {
        "id": 1,
        "firstName": "Steve",
        "lastName": "Johnson",
        "department": "CS",
        "phoneNumber": "423456754"
      }
    ];
    component.firstName = 'John';
    component.lastName = 'Douglas';
    component.department = 'IT';
    component.phoneNumber = '423456754';
    component.count = 1;
    component.addNewEmployee();
    expect(component.addressBook).toEqual([
      {
        "id": 2,
        "firstName": "John",
        "lastName": "Douglas",
        "department": "IT",
        "phoneNumber": "423456754"
      },
      {
        "id": 1,
        "firstName": "Steve",
        "lastName": "Johnson",
        "department": "CS",
        "phoneNumber": "423456754"
      }
    ]);
  }));
  it('should clear all the fields', async(() => {
    const component = new AppComponent();
    component.firstName = 'John';
    component.lastName = 'Douglas';
    component.department = 'IT';
    component.phoneNumber = '423456754';
    component.clearFields();
    expect(component.firstName).toEqual('');
    expect(component.lastName).toEqual('');
    expect(component.department).toEqual('');
    expect(component.phoneNumber).toEqual('');
  }));
  it('should cancel search and show all the employees', async(() => {
    const component = new AppComponent();
    component.search = true;
    component.addressBookTemp = [
      {
        "id": 2,
        "firstName": "John",
        "lastName": "Douglas",
        "department": "IT",
        "phoneNumber": "423456754"
      },
      {
        "id": 1,
        "firstName": "Steve",
        "lastName": "Johnson",
        "department": "CS",
        "phoneNumber": "423456754"
      }
    ];
    component.addressBook = [{
      "id": 1,
      "firstName": "Steve",
      "lastName": "Johnson",
      "department": "CS",
      "phoneNumber": "423456754"
    }];
    component.lastNameSearch = 'Douglas';
    component.departmentSearch = 'IT';
    component.firstNameSearch = 'John';
    component.cancelSearch();
    expect(component.addressBook).toEqual(component.addressBookTemp);
    expect(component.lastNameSearch).toEqual('');
    expect(component.departmentSearch).toEqual('');
    expect(component.firstNameSearch).toEqual('');
    expect(component.search).toEqual(false);
  }));
});
