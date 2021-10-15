data=[
    {
        id: 1,
        brand: "a"
    },
    {
        id: 2,
        brand: "a"
    },
    {
        id: 3,
        brand: "b"
    },
    {
        id: 4,
        brand: "b"
    },
    {
        id: 5,
        brand: "c"
    },
    {
        id: 6,
        brand: "c"
    },
]

marcas=[]

for (let i = 0; i < data.length; i++) {
    console.log(
        marcas.findIndex(element=>{
            return element==data[i].brand;
        })
    );
}