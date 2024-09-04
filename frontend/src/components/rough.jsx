<nav className="bg-gray-800 p-4">
  <div>
    <EasyBooksLogo />
  </div>
  <div className="flex justify-between">
    <div className="flex">
      <ul className="flex">
        <li className="mr-4">
          <button className="text-white">Customers</button>
          <div className="hidden">
            <a href="#" className="block py-2">
              Customers Home
            </a>
            <a href="#" className="block py-2">
              New Customer
            </a>
            <a href="#" className="block py-2">
              New Invoice
            </a>
            <a href="#" className="block py-2">
              Receive Payment
            </a>
            <a href="#" className="block py-2">
              Make Refund
            </a>
            <a href="#" className="block py-2">
              Sales Receipt
            </a>
          </div>
        </li>
        <li className="mr-4">
          <button className="text-white">Suppliers</button>
          <div className="hidden">
            <a href="#" className="block py-2">
              Suppliers Home
            </a>
            <a href="#" className="block py-2">
              New Vendor
            </a>
            <a href="#" className="block py-2">
              New Bill
            </a>
            <a href="#" className="block py-2">
              Bill Payment
            </a>
            <a href="#" className="block py-2">
              Expense Payment
            </a>
          </div>
        </li>
        <li className="mr-4">
          <button className="text-white">Banking</button>
          <div className="hidden">
            <a href="#" className="block py-2">
              Banking Home
            </a>
            <a href="#" className="block py-2">
              Receive Payment
            </a>
            <a href="#" className="block py-2">
              Bill Payment
            </a>
            <a href="#" className="block py-2">
              Expense Payment
            </a>
            <a href="#" className="block py-2">
              Transfer
            </a>
          </div>
        </li>
        <li className="mr-4">
          <button className="text-white">Products</button>
          <div className="hidden">
            <a href="{% url 'products_list' %}" className="block py-2">
              Product Home
            </a>
            <a href="#" className="block py-2">
              Create New Product
            </a>
          </div>
        </li>
        <li className="mr-4">
          <button className="text-white">Accounting</button>
          <div className="hidden">
            <a href="#" className="block py-2">
              Reports
            </a>
            <a href="#" className="block py-2">
              Journal Entry
            </a>
          </div>
        </li>
        <li>
          <button className="text-white">Payroll</button>
          <div className="hidden">
            <a href="#" className="block py-2">
              Payroll Home
            </a>
            <a href="#" className="block py-2">
              Create New Employee
            </a>
          </div>
        </li>
      </ul>
    </div>
    <div className="flex items-center">
      <ul className="flex">
        <li className="mr-4">
          <button className="text-white">Settings</button>
          <div className="hidden">
            <a href="#" className="block py-2">
              Company Settings
            </a>
            <a href="#" className="block py-2">
              Chart of Accounts
            </a>
          </div>
        </li>
        <li>
          <a href="#" className="text-white">
            About us
          </a>
        </li>
      </ul>
    </div>
  </div>
</nav>;
