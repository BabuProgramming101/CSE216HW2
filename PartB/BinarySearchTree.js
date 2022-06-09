class Node {
    constructor(initKey, initData, initParent, initLeft, initRight) {
        this.key = initKey;
        this.data = initData;
        this.parent = initParent;
        this.left = initLeft;
        this.right = initRight;
    }
};

export default class BinarySearchTree {
    constructor(initKeyLength) {
        this.root = null;
        this.size = 0;
        this.keyLength = initKeyLength;
    }

    // @todo - YOU MUST UPDATE THIS METHOD SO A KEY ONLY HAS LOWERCASE LETTERS, NO NUMBERS
    generateKey() {
        let key = "";
        for (let i = 0; i < this.keyLength; i++) {
            let randomNum = Math.floor(Math.random() * 26) + 97;
            let randomChar = String.fromCharCode(randomNum);
            key += randomChar;
        }
        return key;
    }

    // @todo - YOU MUST DEFINE THIS METHOD
    putValue(key, value) {

        let node;
        let cursor;
        let complete = false;
        if(this.root == null) {
            node = new Node(key, value);
            this.root = node;
            this.size++;
        }
        else {
            cursor = this.root;
            while(!complete) {
                if(key == cursor.key) {
                    cursor.key = key;
                    cursor.data = value;
                    complete = true;
                }
                else if(key < cursor.key) {
                    if(cursor.left == null) {
                        node = new Node(key, value);
                        cursor.left = node;
                        this.size++;
                        complete = true;
                    }
                    else {
                        cursor = cursor.left;
                    }
                }
                else if(key > cursor.key) {
                    if(cursor.right == null) {
                        node = new Node(key, value);
                        cursor.right = node;
                        this.size++;
                        complete = true;
                    }
                    else {
                        cursor = cursor.right;
                    }
                }
                else {
                    complete = true;
                }
            }
        }
    }

    // @todo - YOU MUST DEFINE THIS METHOD
    getValue(key) {
        
        let cursor = this.root;
        while(cursor != null) {
            if(key < cursor.key) {
                cursor = cursor.left;
            }
            else if(key > cursor.key) {
                cursor = cursor.right;
            }
            if(key == cursor.key) {
                break;
            }
        }

        if(cursor == null) {
            console.log("Key could not be found");
            return null;
        }
        else {
            if(cursor == this.root) {
                console.log("\nThe key has been found");
                return cursor.data;
            } 
            else if(cursor != this.root && cursor.key == key) {
                console.log("\nThe key has been found");
                return cursor.data;
            }

        }
        return null;
    }

    // @todo - YOU MUST DEFINE THIS METHOD
    removeValue(key) {

    }

    toStringRecursively(traveller, level) {
        let text = "";
        if (traveller.left != null)
            text += this.toStringRecursively(traveller.left, level+1);
        for (let i = 0; i < level; i++) {
            text += "   ";
        }
        text += "   " + traveller.data.toString() + "\n";
        if (traveller.right != null)
            text += this.toStringRecursively(traveller.right, level+1);
        return text;        
    }

    toString() {
        return this.toStringRecursively(this.root, 0);
    }
}