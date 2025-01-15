import Pricing from "../../models/AboutPages/PricingModel.js";

// Update Pricing Page
const UpdatePricingPage = async (req, res) => {
  const {
    horoscopeBanner,
    intro_para,
    basic_price,
    premium_price,
    diamond_price,
    list1,
    list2,
    list3,
    last_para,
  } = req.body;

  try {
    const pricingPage = await Pricing.findOneAndUpdate(
      {}, // Match the first document
      {
        horoscopeBanner,
        intro_para,
        basic_price,
        premium_price,
        diamond_price,
        list1,
        list2,
        list3,
        last_para,
      },
      { new: true }
    );

    if (!pricingPage) {
      return res.status(400).json({ message: "Pricing page not updated" });
    }

    res.json(pricingPage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get Pricing Page
const GetPricingPage = async (req, res) => {
  try {
    const pricingPage = await Pricing.findOne();

    if (!pricingPage) {
      return res.status(404).json({ message: "Pricing page not found" });
    }

    res.json(pricingPage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { UpdatePricingPage, GetPricingPage };
