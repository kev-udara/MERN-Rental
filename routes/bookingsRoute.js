const express = require("express");
const router = express.Router();
const Booking = require("../models/bookingModel")
const AccessoryBooking = require("../models/bookingaccessoryModel")
const Car = require ('../models/carModel')
const Accessory = require('../models/accessoryModel')
const {v4 : uuidv4} = require('uuid');
const stripe = require('stripe')('sk_test_51MY5mXKMkMUz9lJBoIR82H71cfpVihoIaUHVkXxEDEP0QznsxUe78RWGYmDhz5r68sNRxnrsOqRXHoTRepxW0P3B00bOPLMfSv')
router.post("/bookcar", async(req, res) => {

    
    const {token} = req.body
    try {
        
        const customer = await stripe.customers.create({
            email: token.email,
            source: token.id
        })

        const payment = await stripe.charges.create({
            amount : req.body.totalAmount * 100,
            currency : 'usd',
            customer : customer.id,
            receipt_email : token.email
        },{
            idempotencyKey : uuidv4()
        });

        if(payment)
        {
            req.body.transactionId = payment.source.id
            const newbooking = new Booking(req.body)
            await newbooking.save()
            const car = await Car.findOne({_id : req.body.car.toString()})
            console.log(req.body.car)
            car.bookedTimeSlots.push(req.body.bookedTimeSlots)
            await car.save()
            res.send('Your booking is successfull')
        }
        else{
            return res.status(400).json(error)
        }

        
    } catch (error) {
        console.log(error)
        return res.status(400).json(error)
        
    }

});
router.post("/bookaccessory", async(req, res) => {

    
    const {token} = req.body
    try {
        
        const customer = await stripe.customers.create({
            email: token.email,
            source: token.id
        })

        const payment = await stripe.charges.create({
            amount : req.body.totalAmount * 100,
            currency : 'usd',
            customer : customer.id,
            receipt_email : token.email
        },{
            idempotencyKey : uuidv4()
        });

        if(payment)
        {
            req.body.transactionId = payment.source.id
            const newbooking = new AccessoryBooking(req.body)
            await newbooking.save()
            const accessory = await Accessory.findOne({_id : req.body.accessory.toString()})
            console.log(req.body.accessory)
            accessory.bookedTimeSlots.push(req.body.bookedTimeSlots)
            await accessory.save()
            res.send('Your booking is successfull')
        }
        else{
            return res.status(400).json(error)
        }

        
    } catch (error) {
        console.log(error)
        return res.status(400).json(error)
        
    }

});
router.get("/getallbookings", async (req, res) => {
    try {
      const bookings = await Booking.find()
        .populate("car")
      res.send(bookings);
    } catch (error) {
      return res.status(400).json(error);
    }
  });

  router.get("/getalladminbookings", async (req, res) => {
    try {
      const bookings = await Booking.find()
        .populate("car")
        .populate("user")
      res.send(bookings);
    } catch (error) {
      return res.status(400).json(error);
    }
  });
  

router.get("/getallaccessorybookings",async(req,res) => {
    try{
    const bookings = await AccessoryBooking.find().populate('accessory')
    res.send(bookings)
    }catch(error){
    return res.status(400).json(error);
    }
    });

    router.get("/getalladminaccessorybookings", async (req, res) => {
      try {
        const bookings = await AccessoryBooking.find()
          .populate("accessory")
          .populate("user")
        res.send(bookings);
      } catch (error) {
        return res.status(400).json(error);
      }
    });

    router.post("/cancelbookings", async (req, res) => {
        try {
          const booking = await Booking.findOneAndDelete({ _id: req.body.bookingid });
          const car = await Car.findById(booking.car);
      
          const updatedBookedTimeSlots = car.bookedTimeSlots.filter(
            (bookedTimeSlot) => {
              return (
                bookedTimeSlot.from !== booking.bookedTimeSlots.from &&
                bookedTimeSlot.to !== booking.bookedTimeSlots.to
              );
            }
          );
      
          car.bookedTimeSlots = updatedBookedTimeSlots;
          await car.save();
      
          res.send("Your booking was cancelled successfully");
        } catch (error) {
          return res.status(400).json(error);
        }
      });
      
      router.post("/removebookings", async (req, res) => {
        try {
          const booking = await Booking.findOneAndDelete({ _id: req.body.bookingid });
          const car = await Car.findById(booking.car);
      
          const updatedBookedTimeSlots = car.bookedTimeSlots.filter(
            (bookedTimeSlot) => {
              return (
                bookedTimeSlot.from !== booking.bookedTimeSlots.from &&
                bookedTimeSlot.to !== booking.bookedTimeSlots.to
              );
            }
          );
      
          car.bookedTimeSlots = updatedBookedTimeSlots;
          await car.save();
      
          res.send("Your booking was removed successfully");
        } catch (error) {
          return res.status(400).json(error);
        }
      });
      
      
      
    router.post("/cancelaccessorybookings",async(req,res) => {
        try{
            const accessorybooking = await AccessoryBooking.findOneAndDelete({_id : req.body.bookingid});
            const accessory = await Accessory.findById(accessorybooking.accessory);

            const updatedaccessoryBookedTimeSlots = accessory.bookedTimeSlots.filter(
                (bookedTimeSlot) => {
                  return (
                    bookedTimeSlot.from !== accessorybooking.bookedTimeSlots.from &&
                    bookedTimeSlot.to !== accessorybooking.bookedTimeSlots.to
                  );
                }
              );
          
              accessory.bookedTimeSlots = updatedaccessoryBookedTimeSlots;
              await accessory.save();


            res.send('Your booking was cancelled successfully')
        }catch(error){
        return res.status(400).json(error);
        }
        });

        router.post("/removedaccessorybookings",async(req,res) => {
          try{
              const accessorybooking = await AccessoryBooking.findOneAndDelete({_id : req.body.bookingid});
              const accessory = await Accessory.findById(accessorybooking.accessory);
  
              const updatedaccessoryBookedTimeSlots = accessory.bookedTimeSlots.filter(
                  (bookedTimeSlot) => {
                    return (
                      bookedTimeSlot.from !== accessorybooking.bookedTimeSlots.from &&
                      bookedTimeSlot.to !== accessorybooking.bookedTimeSlots.to
                    );
                  }
                );
            
                accessory.bookedTimeSlots = updatedaccessoryBookedTimeSlots;
                await accessory.save();
  
  
              res.send('Your booking was cancelled successfully')
          }catch(error){
          return res.status(400).json(error);
          }
          });

        
        // PUT /api/bookings/:id/status
        router.put('/:id/status', async (req, res) => {
          try {
            const booking = await Booking.findById(req.params.id);
            booking.status = req.body.status;
            await booking.save();
            res.json(booking);
          } catch (error) {
            console.log(error);
            res.status(500).send('Something went wrong, please try later');
          }
        });
        
        
           // PUT /api/bookings/:id/status
           router.put('/:id/accessorystatus', async (req, res) => {
            try {
              const booking = await AccessoryBooking.findById(req.params.id);
              booking.status = req.body.status;
              await booking.save();
              res.json(booking);
            } catch (error) {
              console.log(error);
              res.status(500).send('Something went wrong, please try later');
            }
          });

          router.get("/payments", async (req, res) => {
            try {
              const charges = await stripe.charges.list();
          
              const payments = charges.data.map((charge) => ({
                id: charge.id,
                amount: charge.amount / 100,
                currency: charge.currency.toUpperCase(),
                status: charge.refunded ? "Refunded" : charge.status,
                created: new Date(charge.created * 1000).toLocaleString(),
                receiptUrl: charge.receipt_url,
                description: charge.description,
                customer: {
                  id: charge.customer,
                  email: charge.receipt_email,
                },
              }));
          
              res.send(payments);
            } catch (error) {
              console.error(error);
              return res.status(500).json({ error: "Failed to fetch payment information" });
            }
          });
          
          

        

module.exports = router