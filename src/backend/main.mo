import Time "mo:core/Time";
import Text "mo:core/Text";
import Array "mo:core/Array";
import Iter "mo:core/Iter";
import Runtime "mo:core/Runtime";

actor {
  type Product = {
    id : Nat;
    name : Text;
    category : Text;
    description : Text;
    tags : [Text];
  };

  type Inquiry = {
    name : Text;
    email : Text;
    phone : Text;
    message : Text;
    timestamp : Int;
  };

  let products : [Product] = [
    // Spices
    { id = 1; name = "Sabudana Papad"; category = "spices"; description = "Traditional snack made from tapioca."; tags = ["jain", "gluten-free"] },
    { id = 2; name = "Jira Papad"; category = "spices"; description = "Cumin flavored papad."; tags = ["jain", "vegan"] },
    { id = 3; name = "Black Salt"; category = "spices"; description = "Aromatic mineral salt with a distinctive taste."; tags = ["vegan", "gluten-free"] },
    { id = 4; name = "Rock Salt"; category = "spices"; description = "Naturally harvested salt crystals."; tags = ["vegan", "gluten-free"] },
    { id = 5; name = "Red Chilli Powder"; category = "spices"; description = "Pure red chilli powder for spicy dishes."; tags = ["spicy"] },
    { id = 6; name = "Red Chilli Powder (Mild)"; category = "spices"; description = "Mild version of red chilli powder."; tags = ["mild"] },
    { id = 7; name = "Turmeric Powder"; category = "spices"; description = "Pure turmeric powder for curries and health."; tags = ["superfood"] },
    { id = 8; name = "Jira Powder"; category = "spices"; description = "Ground cumin powder for seasoning."; tags = ["jain", "vegan"] },
    { id = 9; name = "Dal Chini Powder"; category = "spices"; description = "Ground cinnamon powder."; tags = ["sweet"] },
    { id = 10; name = "Dal Chini Sticks"; category = "spices"; description = "Whole cinnamon sticks."; tags = ["sweet"] },
    { id = 11; name = "Limon Powder"; category = "spices"; description = "Citrusy powder for flavoring dishes."; tags = ["sour"] },

    // Snacks
    { id = 12; name = "Chana Dal"; category = "snacks"; description = "Crunchy fried split chickpeas."; tags = ["vegan", "protein"] },
    { id = 13; name = "Green Moong"; category = "snacks"; description = "Crispy fried green gram lentils."; tags = ["vegan", "protein"] },
    { id = 14; name = "Besan Sev"; category = "snacks"; description = "Fried gram flour noodles."; tags = ["jain", "vegan"] },
    { id = 15; name = "Tikyya Salty"; category = "snacks"; description = "Savory fried wheat flour sticks."; tags = ["snack"] },
    { id = 16; name = "Mix Chivda"; category = "snacks"; description = "Mixed fried snack of rice flakes, lentils and peanuts."; tags = ["spicy", "snack"] },
    { id = 17; name = "Aloo Bhujia"; category = "snacks"; description = "Crunchy potato based snack."; tags = ["spicy", "snack"] },
    { id = 18; name = "Masala Peanuts"; category = "snacks"; description = "Peanuts coated in spicy gram flour batter."; tags = ["spicy", "protein"] },
    { id = 19; name = "Aloo Lachha"; category = "snacks"; description = "Potato crisps with tangy masala."; tags = ["spicy", "snack"] },
    { id = 20; name = "Sevpuri"; category = "snacks"; description = "Crispy fried puris topped with sev and chutneys."; tags = ["spicy", "snack"] },
    { id = 21; name = "Mamra"; category = "snacks"; description = "Puffs made from rice with a tangy seasoning."; tags = ["spicy", "snack"] },
    { id = 22; name = "Samosa Sev"; category = "snacks"; description = "Fried snack shaped like mini samosas and thin sev."; tags = ["spicy", "snack"] },
    { id = 23; name = "Nylon Sev"; category = "snacks"; description = "Finely extruded fried gram flour noodles."; tags = ["jain", "vegan"] },
    { id = 24; name = "Sing Nariyal Mix"; category = "snacks"; description = "Peanut and coconut mixture."; tags = ["snack"] },
    { id = 25; name = "Chiura Bhujia"; category = "snacks"; description = "Fried rice flakes and potato sev."; tags = ["spicy", "snack"] },
    { id = 26; name = "Boondi"; category = "snacks"; description = "Fried gram flour balls for snacks or garnishing."; tags = ["snack"] },
    { id = 27; name = "Dal Moth"; category = "snacks"; description = "Spicy lentil and noodle mixture."; tags = ["spicy", "snack"] },
    { id = 28; name = "Samosa"; category = "snacks"; description = "Fried pastry with spicy potato filling."; tags = ["snack"] },
    { id = 29; name = "Mava Kut"; category = "snacks"; description = "Indian sweet made with condensed milk and dry fruits."; tags = ["sweet"] },
    { id = 30; name = "Supari"; category = "snacks"; description = "Betel nut balls with flavored sweet topical coatings."; tags = ["sweet"] },
    { id = 31; name = "Papdi"; category = "snacks"; description = "Thin fried puris used for chaat dishes."; tags = ["spicy", "snack"] },
  ];

  var inquiries : [Inquiry] = [];

  public query ({ caller }) func getAllProducts() : async [Product] {
    products;
  };

  public query ({ caller }) func getProductsByCategory(category : Text) : async [Product] {
    products.filter(func(p) { p.category == category });
  };

  public shared ({ caller }) func submitInquiry(name : Text, email : Text, phone : Text, message : Text) : async () {
    if (name == "") { Runtime.trap("Name cannot be empty") };
    if (email == "") { Runtime.trap("Email cannot be empty") };
    if (message == "") { Runtime.trap("Message cannot be empty") };

    let newInquiry : Inquiry = {
      name;
      email;
      phone;
      message;
      timestamp = Time.now();
    };

    inquiries := inquiries.concat([newInquiry]);
  };

  public query ({ caller }) func getAllInquiries() : async [Inquiry] {
    inquiries;
  };
};
