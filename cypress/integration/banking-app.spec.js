describe('Test Proyecto', () =>{
  
  it('register test', () =>{
    const item={"dni": 1193543225,"email": "nicolasRomero@gmail.com","name_lastname": "Nicolas Romero Robayo","username": "NicolasRomeroRobayo1","pass": "password1","passConfirm": "password1","id_bank": 1}
    cy.request('POST','http://localhost:4001/api/auth/register',item)
  })

  it('login test', () =>{
    const item={"username": "NicolasRomeroRobayo","pass":"password"}
    cy.request('POST', 'http://localhost:4001/api/auth/login',item)
  })

  /*it('payment test', () =>{
    const item={"invoice_amount": 60000,"number_payment_references": "97728744170","id_service": 31}
    cy.request({
      Method: 'POST',
      URL:'http://localhost:4001/api/payments/payment',item,auth: {bearer: PaymentResponse}
    })
    
  })*/
  
  it('tranfer test', () =>{

  })
})