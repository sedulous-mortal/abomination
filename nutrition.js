function setAction(form) {
    console.log('form submitted')
    form.action = "addFood.html";
    alert(form.action);
    return false;
  }