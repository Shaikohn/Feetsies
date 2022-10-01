const {Product,Product_type,Animal,Animal_type,User,Adoption_petition} = require('../db');

const mockUsers =[
    {
        email:'lioandres@afa.com',
        password:'lapelotaal10',
    },
    {
        email:'linustorvalds@mit.com',
        password:'vamoslinux',
    },
    {
        email:'succaritas@evilcorp.com',
        password:'nosoyunlagarto',
    }
];

const mockAnimals =[
    {
        name:'Aaron',
        description:'A very playful Dogger',
        sex:'Male',
        breed:'None',
        size:'Large',
        age:'5'
    },
    {
        name:'Brady',
        description:'A friendly cat',
        sex:'Female',
        breed:'None',
        size:'Medium',
        age:'6'
    },
    {
        name:'Charlie',
        description:'A tiny and furry hamster',
        sex:'Female',
        breed:'None',
        size:'Small',
        age:'3'
    },
    {
        name:'Django',
        description:'Not a development framework done in python, but actually a Python',
        sex:'Male',
        breed:'Python',
        size:'Large',
        age:'1'
    },
    {
        name:'Entei',
        description:'I think it was a pokemon',
        sex:'Male',
        breed:'Pkmn',
        size:'Large',
        age:'999999'
    },
    {
        name:'Florida',
        description:'A little beetle i got from my backyard. Now I can say my database has BUGS',
        sex:'Female',
        breed:'Bug',
        size:'Small',
        age:'1'
    },
    {
        name:'Garmfielf',
        description:'He is a fat cAt, whY Is He so FAAAT',
        sex:'Male',
        breed:'None',
        size:'Large',
        age:'8'
    },
    {
        name:'Hillary',
        description:'But not Clinton. This is an actually likeable Hillary',
        sex:'Female',
        breed:'None',
        size:'Medium',
        age:'4'
    },
    {
        name:'Indigo',
        description:'Brother to another animal in this DB, but I cant remember which it was.',
        sex:'Male',
        breed:'None',
        size:'Medium',
        age:'5'
    },
    {
        name:'Jake',
        description:'Brother to a human named Finn. He a stretchy boi',
        sex:'Male',
        breed:'None',
        size:'Medium',
        age:'5'
    },
    {
        name:'Kylian',
        description:'A hard-shelled turtle.Likes soccer. His peers dont seem to like him much.',
        sex:'Male',
        breed:'None',
        size:'Small',
        age:'23'
    },
    {
        name:'Lilia',
        description:'Lorem ipsum',
        sex:'Female',
        breed:'None',
        size:'Small',
        age:'3'
    },
    {
        name:'Mao',
        description:'A quite angry cat.Sometimes likes people, sometimes absolutely despises it',
        sex:'Male',
        breed:'None',
        size:'Small',
        age:'76'
    },
    {
        name:'Nairobi',
        description:'She is a cute dog. Sometimes likes to steal bones from your meals',
        sex:'Female',
        breed:'None',
        size:'Medium',
        age:'7'
    },
    {
        name:'Orwell',
        description:'Used to be the pet of an IT guy',
        sex:'Male',
        breed:'None',
        size:'Medium',
        age:'3'
    },
    {
        name:'Parrrrley',
        description:'Retrieved from the Alberdi neighbourhood. He was stained of cyan paint when we got him here.',
        sex:'Male',
        breed:'Pirate',
        size:'Large',
        age:'5'
    },
    {
        name:'Quinn',
        description:'yadda yadda',
        sex:'Female',
        breed:'Birb',
        size:'Medium',
        age:'5'
    },
    {
        name:'Riley',
        description:'nothing to see here',
        sex:'Female',
        breed:'None',
        size:'Medium',
        age:'32'
    },
    {
        name:'Susan',
        description:'Joao cancelo was here',
        sex:'Female',
        breed:'None',
        size:'Medium',
        age:'6'
    },
    {
        name:'Tracy',
        description:'Likes detective movies',
        sex:'Male',
        breed:'None',
        size:'Medium',
        age:'6'
    },
    {
        name:'Ursa',
        description:'Rome is a nice city',
        sex:'Female',
        breed:'None',
        size:'Medium',
        age:'6'
    },
    {
        name:'Vladimir',
        description:'Something about Ukraine',
        sex:'Male',
        breed:'None',
        size:'Medium',
        age:'6'
    },
    {
        name:'William',
        description:'The most generic british-sounding first name',
        sex:'Male',
        breed:'None',
        size:'Medium',
        age:'6'
    },
    {
        name:'Xenia',
        description:'Dont ask where I got her from',
        sex:'Male',
        breed:'None',
        size:'Medium',
        age:'6'
    },
];

const mockProducts =[
    {
        name:'Dog Food',
        description:'Food aimed to be consumed by dogs. Tastes like X',
        price:400,
        productTypes:['Food'],
        animalTypes:['Dog'],
    },
    {
        name:'Leathery Dog Bone',
        description:'Part food, part toy, your dog can play with this item, which is also edible.',
        price:200,
        productTypes:['Food','Toy'],
        animalTypes:['Dog'],
    },
    {
        name:'Birthday hat',
        description:`Celebrate your pet's birthday with this hat!`,
        price:150,
        productTypes:['Clothing','Toy'],
        animalTypes:['Dog','Cat','Other'],
    },
    {
        name:'Nepeta Cataria',
        description:'Herbal mix that produces a recreative pseudonarcotic effect on your cat',
        price:300,
        productTypes:['Other'],
        animalTypes:['Cat'],
    },
    {
        name:'Cat bed',
        description:'A place where ypur cat can sleep comfy',
        price:1200,
        productTypes:['Other'],
        animalTypes:['Cat'],
    },
    {
        name:'General test item',
        description:'testing an iten that has every tag',
        price:12345,
        productTypes:['Clothing','Toy','Food','Other'],
        animalTypes:['Cat','Dog','Rodent','Other'],
    },
    {
        name:'Wooden flakes',
        description:'Material used for rodent cage flooring. They sleep on it but also use it as bathroom.',
        price:600,
        productTypes:['Other'],
        animalTypes:['Rodent'],
    },
    {
        name:'Another test item',
        description:'Another test item',
        price:600,
    },
];

const mockPetitions =[];

const mockInquiries =[];

const mockSolicitudes =[];
