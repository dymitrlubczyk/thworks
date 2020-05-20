class Node{

    constructor(coef,pow,next) {
        this.coef=parseFloat(coef);
        this.pow=parseFloat(pow);
        this.next=next;

    }

}

export default class Expression{
    constructor(expression) {


        if(expression)
        {
            let coefArray= this.processInput(expression);
            this.head=new Node(coefArray[0][0] || 1,coefArray[0][1] || 0, null);
            this.tail=this.head;
            this.length=1;


            for(let i=1; i<coefArray.length; ++i)
            {
                let current=new Node(coefArray[i][0] || 1,coefArray[i][1] || 0, null);
                this.tail.next=current;
                this.tail=current;
                this.length+=1;
            }

        }

        //empty expression which is w(x)=0, neutral element of addition
        else
        {
             this.head=new Node(0,0,null);
             this.tail=this.head;
             this.length=1;
        }




    }


    print(){
        let iter=this.head;

        console.log("Expression")
        while(iter)
        {
            if(iter.coef!=0)
                console.log(iter.coef+(iter.pow?'x^'+iter.pow:''));

            iter=iter.next;
        }

    }

    add(expression)
    {
        let iter1=this.head;
        let iter2=expression.head;
        let result= new Expression();

        //set head and tail of result
        if(iter1.pow>iter2.pow)
        {
             if(iter1.coef) {
                 result.head = new Node(iter1.coef, iter1.pow, null);
                 result.tail = result.head;
                 result.length = 1;
             }
             iter1 = iter1.next;
        }

        else if(iter1.pow<iter2.pow)
        {
            if(iter2.coef) {
                result.head = new Node(iter2.coef, iter2.pow, null);
                result.tail = result.head;
                result.length = 1;
            }

            iter2 = iter2.next;
        }

        else
        {
            if(iter1.coef+iter2.coef)
            {
                result.head=new Node(iter1.coef+iter2.coef,iter1.pow,null);
                result.tail=result.head;
                result.length=1;
            }

            iter1=iter1.next;
            iter2=iter2.next;


        }




        //common part addition
        while(iter1 && iter2)
        {
            if(iter1.pow>iter2.pow)
            {
                 if(iter1.coef) {
                     result.tail.next = new Node(iter1.coef, iter1.pow, null);
                     result.tail = result.tail.next;
                     result.length += 1;
                 }

                 iter1 = iter1.next;
            }

            else if(iter1.pow<iter2.pow)
            {
                if(iter2.coef){

                    result.tail.next=new Node(iter2.coef,iter2.pow,null);
                    result.tail=result.tail.next;
                    result.length+=1;
                }

                iter2=iter2.next;

            }

            else
            {
                if(iter1.coef+iter2.coef)
                {
                    result.tail.next = new Node(iter1.coef + iter2.coef, iter1.pow, null);
                    result.tail = result.tail.next;
                    result.length+=1;
                }

                iter1 = iter1.next;
                iter2 = iter2.next;

            }





        }

        //remaining parts
        while(iter1)
        {
             if(iter1.coef) {

                result.tail.next = new Node(iter1.coef, iter1.pow, null);
                result.tail = result.tail.next;
                result.length += 1;
             }

             iter1 = iter1.next;
        }

        while(iter2)
        {
            if(iter2.coef){

                result.tail.next=new Node(iter2.coef,iter2.pow,null);
                result.tail=result.tail.next;
                result.length+=1;
            }

            iter2=iter2.next;
        }


        return result;

    }

    equals(expression)
    {


        let iter1=this.head;
        let iter2=expression.head;
        while(iter1 && iter2)
        {
            if(iter1.pow!==iter2.pow || iter1.coef!==iter2.coef)
                return false;
            iter1=iter1.next;
            iter2=iter2.next;
        }

        return true;


    }


    //string parsing
     processInput(input){
        let processedArray=input.split(')');

        processedArray.pop();

        for(let i=0; i<processedArray.length; ++i)
            processedArray[i]=processedArray[i].replace('(','').split('x^');

        return processedArray;
    }

}
