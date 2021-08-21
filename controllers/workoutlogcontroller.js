// const { response } = require("express");
let Express = require("express");
let router = Express.Router();
let validateJWT = require("../middleware/validate-jwt");

const {LogModel} = require("../models");

router.get("/practice", validateJWT, (req, res)=>{
    res.send("Hey!! This is a practice route!")
});






router.post("/", validateJWT, async (req, res)=> {
    const {description, definitions, results} = req.body.log;
    const {id} = req.user;
    const logEntry = {
        description,
        definitions, 
        results,
        owner: id
    }
    try{
        const newLog = await LogModel.create(logEntry);
        res.status(200).json(newLog);
    }catch (err){
        res.status(500).json({error:err});
    }
    LogModel.create(logEntry)
});

router.get("/about", (req,res)=>{
    res.send("This is the about route!")
})

// // WOULD NOT WORK IN POSTMAN
// router.get("/", async (req, res)=>{
//     try{
//         const entries = await LogModel.findAll();
//         res.status(200).json(entries);
//     } catch (err) {
//         response.status(500).json({ error: err})
//     }
// });


router.get("/", validateJWT, async(req,res)=>{
    let {id} = req.user;
    try{
        const userLogs = await LogModel.findAll({
            where: {
                owner: id
            }
        });
        res.status(200).json(userLogs);
    } catch (err) {
        res.status(500).json({error: err});
    }
});

router.get("/:id", validateJWT,  async(req,res)=>{
    let {id} = req.params;
    try{
        const results = await LogModel.findAll({
            where: {id: id}
        });
        res.status(200).json(results);
    } catch (err) {
        res.status(500).json({error: err});
    }
});

// HOW DO I TEST THIS IN POSTMAN??? UPDATE LOG
router.put("/:id", validateJWT, async (req, res)=>{
    const {description, definitions, results} = req.body.log;
    const logId = req.params.entryId;
    const userId = req.user.id;

    const query = {
        where: {
            id: logId,
            owner: userId
        }
    };

    const updatedLog = {
        description: description,
        definitions: definitions,
        results: results,
    };
    try{
        const update = await LogModel.update(updatedLog, query);
        res.status(200).json(update);
    } catch (err) {
        res.status(500).json({error:err});
    }
});

// HOW DO I TEST THIS IN POSTMAN?
router.delete("/:id", validateJWT, async (req, res)=>{
    const ownerId = req.body.id;
    const logId = req.params.id;

    try{
        const query = {
            where: {
                id: logId,
                owner: ownerId
            }
        };
        await LogModel.destroy(query);
        res.status(200).json({message: "Workout Log Entry Removed"});
    } catch (err) {
        res.status(500).json({error:err});
    }
})


module.exports = router;