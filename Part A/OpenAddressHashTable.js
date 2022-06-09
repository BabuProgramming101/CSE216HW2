class KeyValuePair {
    constructor(initKey, initValue) {
        this.key = initKey;
        this.value = initValue;
    }
    
    toString() {
        return "(" + this.key + ", " + this.value.toString() + ")";
    }
}

export default class OpenAddressHashTable {
    constructor(initLength, initKeyLength) {
        this.length = initLength;
        this.size = 0;
        this.keyLength = initKeyLength;
        this.hashTable = [];
    }

    hashCode(key) {
        let charsSum = 0;
        for (let i = 0; i < key.length; i++) {
            let keyChar = key.charAt(i);
            let charAsNum = keyChar.charCodeAt(0);
            charsSum += charAsNum;
        }
        return charsSum % this.length;
    }

    generateKey() {
        let key = "";
        for (let i = 0; i < this.keyLength; i++) {
            let randomNum = Math.floor(Math.random() * 36);
            let randomChar;
            if (randomNum < 10) {
                randomNum += 48;
                randomChar = String.fromCharCode(randomNum);
            }
            else {
                randomNum += 55;
                randomChar = String.fromCharCode(randomNum);
            }
            key += randomChar;
        }
        return key;
    }
    
    // @todo - YOU MUST DEFINE THIS METHOD
    getValue(key) {
        return null;
    }
    
    // @todo - YOU MUST DEFINE THIS METHOD
    removeValue(key) {   
    }

    // @todo - YOU MUST DEFINE THIS METHOD
    putValue(key, item) {

         //REHASHING FUNCTION

         if(this.size == this.length) {

            //SCENARIO 1: WE TRY TO INSERT AN ALREADY PRESENT KEY WHEN THE SIZE OF THE HASHTABLE
            //REACHES ITS CAPACITY: IN THIS CASE, WE ITERATE THROUGH THE HASHMAP AND REPLACE
            //THE ALREADY EXISTING KEY WITH A NEW ITEM WITHOUT HAVING TO INCREASE THE SIZE OF
            //THE HASHMAP

            let tempKeyValuePair = new KeyValuePair(key, item);
            for(let i = 0; i < this.length; i++) {
                if(this.hashTable[i] == undefined) {
                    continue;
                }
                else {
                    if(this.hashTable[i].key == key) {
                        this.hashTable[i] = tempKeyValuePair;
                        return;
                    }
                }
            }

            this.length = this.length * 2;
            let newTable = [];
            for(let i = 0; i < this.length / 2; i++) {
                newTable[i] = this.hashTable[i]
            }
            this.hashTable = newTable;

            let tempTable = [];
            for(let i = 0; i < this.length / 2; i++) {
                tempTable[i] = this.hashTable[i];
                this.hashTable[i] = undefined;
            }
            for(let i = 0; i < this.length / 2; i++) {
                let newNaturalIndex = this.hashCode(tempTable[i].key);
                if(this.hashTable[newNaturalIndex] == undefined) {
                    this.hashTable[newNaturalIndex] = tempTable[i];
                }
                else {
                    while(this.hashTable[newNaturalIndex] != undefined) {
                        newNaturalIndex++;
                        newNaturalIndex %= this.length;
                    }
                    if(this.hashTable[newNaturalIndex] == undefined) {
                        this.hashTable[newNaturalIndex] = tempTable[i];
                    }
                }
            }
        }
        
        let index = this.hashCode(key);
        let keyValuePair = new KeyValuePair(key, item);

        //WHILE LOOP TO FIND THE NEXT AVAILABLE SPOT AND ALSO REPRESENTS OUR SCENARIO 2
        //OF REPLACING AN ALREADY EXISTING KEY:
        //IF THE KEY AT THAT INDEX IS THE SAME AS THE KEY THAT IS PROVIDED IN THE PARAMETER
        //THEN WE JUST REPLACE THE KEY WITHOUT HAVING TO GO THROUGH THE REST OF THE LOOP

        while(this.hashTable[index] != undefined) {
            if(this.hashTable[index].key == key) {
                this.hashTable[index] = keyValuePair;
                return;
            }
            else {
                index++;
                index %= this.length;
            }
        }
    
        if(this.hashTable[index] == undefined) {
            this.size++;
            this.hashTable[index] = keyValuePair;
        }
    }
    
    toString() {
        let text = "[\n";
        for (let i = 0; i < this.length; i++) {
            let kvp = this.hashTable[i];
            let kvpDescription = "null";
            if (kvp != null) {
                kvpDescription = kvp.toString();
            }
            text += "   " + i + ": " + kvpDescription + "\n";
        }
        text += "]\n";
        return text;
    }
};