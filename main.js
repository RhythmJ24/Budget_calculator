class TransactionList {
  constructor(transactionList){
  this.incomeList = transactionList.incomeList;
  this.expenseList = transactionList.expenseList;
  this.id = transactionList.id;
  }
  
  addNewTransaction(type, data){
      if(type ==='income'){
          this.incomeList.push(data);
      }
      else{
          this.expenseList.push(data);
      }
  }
  
  removeTransaction(rowIndex, type){
      if(type ==='income'){
          this.incomeList.splice(rowIndex, 1);
      }
      else{
          this.expenseList.splice(rowIndex, 1);
      }
  

  }
  
  showData(){
    return{"incomeList":this.incomeList, "expenseList":this.expenseList,"id":this.id};
  }

}

let ObjectTransactionList = new TransactionList({'incomeList':[], 'expenseList':[], 'id':"1"})

class Transaction{
  constructor(){
          this.data = [];
  }
  static id = 1;

  static increaseCount() {
    this.id += 1;
  }

  static getCount() {
    return this.id;
  }

  createTransaction (amount, description, type, id){  
    let transactionData = {"amount":amount, "description":description, "type":type, "id":id, date:moment().format('MMMM Do YYYY')}; 
    this.data.push(transactionData); 
    console.log(transactionData);
  }
  
}

let ObjectTransaction =  new Transaction();


// Adding New Transaction
function addTransaction (){
  let description = document.getElementById('add__description').value;
  let amount = document.getElementById('add__value').value;
  let type = null;
  
  if(amount < 0){
      type = 'expense';
      amount = Number(amount) * -1;
  }
  else{
      type = 'income';
  }
  
  let id = Transaction.getCount();
  ObjectTransaction.createTransaction(amount, description,type, id);
  ObjectTransactionList.addNewTransaction(type, data={'amount':amount,'description':description,'id':id, 'date':moment().format('MMMM Do YYYY')})
  
  showTransaction();
  Transaction.increaseCount();

  document.getElementById('add__description').value='';
  document.getElementById('add__value').value='';   
 
}

// Delete Expenses
function deleteExpenses(rowIndex){
  ObjectTransactionList.removeTransaction(rowIndex,"expense");
  showTransaction();
}

// Delete Income
function deleteIncome(rowIndex){
  ObjectTransactionList.removeTransaction(rowIndex, "income");
  showTransaction();
}

// Refresh All transactions
function showTransaction(){
  
  let TotalExpenses = 0;
  let TotalIncome = 0;
  let expensesListDiv = document.getElementsByClassName('expenses__list')[0];
  let incomesListDiv = document.getElementsByClassName('income__list')[0];
  let allTransactionData = ObjectTransactionList.showData();
  
  let m_names = ['January', 'February', 'March', 
         'April', 'May', 'June', 'July', 
         'August', 'September', 'October', 'November', 'December'];
  
  document.getElementsByClassName('budget__title--month')[0].innerHTML= m_names[new Date().getMonth()] +" "+ new Date().getFullYear();
  document.getElementsByClassName("budget__expenses--percentage")[0].innerHTML = '0%'
  
  if(allTransactionData.incomeList.length <= 0){
      incomesListDiv.innerHTML='';
      const div = document.createElement('div');
      div.className = 'row';
      div.innerHTML='<p>No Income Data Found</p>'
      incomesListDiv.appendChild(div);
  }
  else{
      incomesListDiv.innerHTML='';
      
      allTransactionData.incomeList.map((income, index)=>{
          TotalIncome += Number(income['amount']);
          
          incomesListDiv.innerHTML +='<div class="item"><div class="item__description">'+income['description']+'</div><div class="right"><div class="item__value">+ $'+Number(income['amount']).toFixed(2)+'</div><div class="item__delete"><button class="item__delete--btn" onclick=deleteIncome('+index+')><i class="ion-ios-close-outline"></i></button></div></div><div class="item__date">'+income['date']+'</div></div>';
          
      })       
  }
  
  if(allTransactionData.expenseList.length<=0){
      expensesListDiv.innerHTML='';
      const div = document.createElement('div');
      div.className = 'row';
      div.innerHTML='<p>No Expenses Data Found</p>'
      expensesListDiv.appendChild(div);
  }
  else{
      expensesListDiv.innerHTML='';
      allTransactionData.expenseList.map((expenses, index)=>{
          console.log(expenses);
          
          TotalExpenses +=Number(expenses['amount']);
          
          expensesListDiv.innerHTML +='<div class="item"><div class="item__description">'+expenses['description']+'</div><div class="right"><div class="item__value">- $'+Number(expenses['amount']).toFixed(2)+'</div><div class="item__percentage">'+Number((Number(expenses['amount'])/TotalIncome)*100).toFixed(0)+'%</div><div class="item__delete"><button class="item__delete--btn" onclick=deleteExpenses('+index+')><i class="ion-ios-close-outline"></i></button></div></div><div class="item__date">'+expenses['date']+'</div></div>'; 
      })
          
  }

  document.getElementsByClassName('budget__income--value')[0].innerHTML='+ $'+TotalIncome;
  document.getElementsByClassName('budget__expenses--value')[0].innerHTML='- $'+TotalExpenses;
  
  if(Number(TotalIncome)!==0){
    let TotalExpensesPercentage = (Number(TotalExpenses)/Number(TotalIncome))*100;
    document.getElementsByClassName("budget__expenses--percentage")[0].innerHTML = TotalExpensesPercentage.toFixed(0) +'%'
  }
  
  let Total = Number(TotalIncome) - Number(TotalExpenses);

  if(Total <0){
   document.getElementsByClassName('budget__value')[0].innerHTML='- $'+Number(Total).toFixed(2)*(-1);   
  }
  else{
    document.getElementsByClassName('budget__value')[0].innerHTML='+ $'+Number(Total).toFixed(2);  
  }
  
}
showTransaction();


