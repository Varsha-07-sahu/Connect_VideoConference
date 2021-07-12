export default class Queue{
    constructor(){
        this.items = []
    }
    empty(){
        return this.items.length == 0;
    }
    front(){
        return this.items[0];
    }
    push(newItem){
        this.items.push(newItem);
    }
    pop(){
        let front = this.front()
        this.items.shift()
    }
    print(){
        console.log(this.items)
    }
}