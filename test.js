// function calculateCurrency(fromTarget, toTarget, amountValue) {
//     if (!fromTarget && !toTarget) return "Seçim yapmalısınız!"
//     if (!fromTarget) return "Çevrilecek değer seçilmedi";
//     if (!toTarget) return "Çevrilmek istenen değer seçilmedi.";
//     if (fromTarget.value === toTarget.value) return "Farklı seçimler yapmalısınız!"
//     if(isNaN(Number(amountValue))) return "Amount olarak sayı girmelisiniz."
//     const currentCurrencyObject = data[fromTarget.value];
//     const resultForOne = currentCurrencyObject[toTarget.value];
//     const result = amountValue * resultForOne;
//     return amountValue + " " + fromTarget.value + " = " + result + " " + toTarget.value;
//   }


const data={
    USD: {EUR: 0.82, GBP: 0.74, TRY: 7.63},
    EUR: {USD: 1.23, GBP: 0.91, TRY: 9.34},
    GBP: {USD: 1.35, EUR: 1.10, TRY: 10.22},
    TRY: {USD: 0.13, EUR: 0.11, GBP: 0.09},
}

const currencyKeys = Object.keys(data) 

function createCurrencyElements(element, root, inputName){
    for (let i = 0; i < element.length; i++) {
        
        const currencyKeyDiv = document.createElement("div")
        const currencyKeyInput = document.createElement("input")
        
        currencyKeyInput.setAttribute("type", "radio")
        currencyKeyInput.setAttribute("name", inputName)
        currencyKeyInput.setAttribute("id", inputName+element[i])
        currencyKeyInput.setAttribute("value", element[i])

        const currencyKeyLabel = document.createElement("label")
        currencyKeyLabel.setAttribute("for", inputName + element[i])
        currencyKeyLabel.textContent = element[i]

        currencyKeyDiv.append(currencyKeyInput)
        currencyKeyDiv.append(currencyKeyLabel)

        root.append(currencyKeyDiv)

    }
}

const parentEl = document.querySelector("#currency-box-from");
const fromInputName = "currency_from";
createCurrencyElements(currencyKeys, parentEl, fromInputName);


const parentToEl = document.querySelector("#currency-box-to");
const toInputName = "currency_to";
createCurrencyElements(currencyKeys, parentToEl, toInputName);


const calculateButton = document.querySelector("#calculate-button");
calculateButton.addEventListener("click", function(){
    
    const currencyResult = document.querySelector("#currency-result"); 
    const amount = document.querySelector("input[name='amount']").value       
    const fromTarget = document.querySelector("input[name='currency_from']:checked");
    const toTarget = document.querySelector("input[name='currency_to']:checked");

    // currencyResult.innerHTML = calculateCurrency(fromTarget, toTarget, amount);

    if(fromTarget==null || toTarget==null){
        currencyResult.innerHTML = '" choose currency! "'   

    }else {
        const amount = document.querySelector("input[name='amount']").value
        const inputBorder = document.querySelector(".input-border")
        
        
        const currentCurrencyObject = data[fromTarget.value];
        const resultForOne = currentCurrencyObject[toTarget.value];
        const result = amount * resultForOne;


        if(fromTarget.value==toTarget.value){
            currencyResult.innerHTML = '" choose different currency! "' ;  
        }else{
            if(isNaN(Number(amount))){
                currencyResult.innerHTML = '" amount should be a number! "'
                inputBorder.style= `border: 1px solid red;`
            }else{
                currencyResult.innerHTML = amount + " " + fromTarget.value + " = " + result + " " + toTarget.value;
                inputBorder.style= `border: 3px solid  #3d3180;`    
            }
        }     
    }
})

