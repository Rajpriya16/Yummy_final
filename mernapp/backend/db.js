const mongoose=require('mongoose');
const mongoURI='mongodb+srv://rajpriya2004:Rajpriya16%40@cluster0.h4fe8rr.mongodb.net/gofoodmern?retryWrites=true&w=majority&appName=Cluster0';
const connectDB = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log('MongoDB Connected...');

        // Access the collection
        const collection = mongoose.connection.db.collection('food_items');
        
        // Fetch the data
        const data = await collection.find({}).toArray();
        if (data.length === 0) {
            console.log('No documents found in the collection.');
        }else{
            global.food_items =data;
            const foodCategory=await mongoose.connection.db.collection("foodCategory");
            const catData = await foodCategory.find({}).toArray();
                if(catData.length===0) console.log('No documents in the collection');
                else{
                    global.food_items=data;
                    global.foodCategory=catData;
                }
            
        }
    } catch (err) {
        console.error('Error:', err.message);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectDB;

