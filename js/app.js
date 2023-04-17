Date.fromJulian = function (j) {
    j = (+j) + (30.0 / (24 * 60 * 60));
    var A = Date.julianArray(j, true);
    return new Date(Date.UTC.apply(Date, A));
};
Date.julianArray = function (j, n) {
    var F = Math.floor;
    var j2, JA, a, b, c, d, e, f, g, h, z;
    j += 0.5;
    j2 = (j - F(j)) * 86400.0;
    z = F(j);
    f = j - z;
    if (z < 2299161) a = z;
    else {
        g = F((z - 1867216.25) / 36524.25);
        a = z + 1 + g - F(g / 4);
    }
    b = a + 1524;
    c = F((b - 122.1) / 365.25);
    d = F(365.25 * c);
    e = F((b - d) / 30.6001);
    h = F((e < 14) ? (e - 1) : (e - 13));
    JA = [F((h > 2) ? (c - 4716) : (c - 4715)),
    h - 1, F(b - d - F(30.6001 * e) + f)];
    var JB = [F(j2 / 3600), F((j2 / 60) % 60), Math.round(j2 % 60)];
    JA = JA.concat(JB);
    if (typeof n == 'number') return JA.slice(0, n);
    return JA;
};
Date.getSeasons = function (y, wch) {
    y = y || new Date().getFullYear();
    if (y < 1000 || y > 3000) throw y + ' is out of range';
    var Y1 = (y - 2000) / 1000,
        Y2 = Y1 * Y1,
        Y3 = Y2 * Y1,
        Y4 = Y3 * Y1;
    var jd, t, w, d, est = 0,
        i = 0,
        Cos = Math.degCos,
        A = [y],
        e1 = [485, 203, 199, 182, 156, 136, 77, 74, 70, 58, 52, 50, 45, 44, 29, 18, 17, 16, 14, 12, 12, 12, 9, 8],
        e2 = [324.96, 337.23, 342.08, 27.85, 73.14, 171.52, 222.54, 296.72, 243.58, 119.81, 297.17, 21.02,
        247.54, 325.15, 60.93, 155.12, 288.79, 198.04, 199.76, 95.39, 287.11, 320.81, 227.73, 15.45],
        e3 = [1934.136, 32964.467, 20.186, 445267.112, 45036.886, 22518.443,
        65928.934, 3034.906, 9037.513, 33718.147, 150.678, 2281.226,
        29929.562, 31555.956, 4443.417, 67555.328, 4562.452, 62894.029,
        31436.921, 14577.848, 31931.756, 34777.259, 1222.114, 16859.074];
    while (i < 4) {
        switch (i) {
            case 0:
                jd = 2451623.80984 + 365242.37404 * Y1 + 0.05169 * Y2 - 0.00411 * Y3 - 0.00057 * Y4;
                break;
            case 1:
                jd = 2451716.56767 + 365241.62603 * Y1 + 0.00325 * Y2 + 0.00888 * Y3 - 0.00030 * Y4;
                break;
            case 2:
                jd = 2451810.21715 + 365242.01767 * Y1 - 0.11575 * Y2 + 0.00337 * Y3 + 0.00078 * Y4;
                break;
            case 3:
                jd = 2451900.05952 + 365242.74049 * Y1 - 0.06223 * Y2 - 0.00823 * Y3 + 0.00032 * Y4;
                break;
        }
        t = (jd - 2451545.0) / 36525;
        w = 35999.373 * t - 2.47;
        d = 1 + 0.0334 * Cos(w) + 0.0007 * Cos(2 * w);
        est = 0;
        for (var n = 0; n < 24; n++) {
            est += e1[n] * Cos(e2[n] + (e3[n] * t));
        }
        jd += (0.00001 * est) / d;
        A[++i] = Date.fromJulian(jd);
    }
    return wch && A[wch] ? A[wch] : A;
};
Math.degRad = function (d) {
    return (d * Math.PI) / 180.0;
};
Math.degSin = function (d) {
    return Math.sin(Math.degRad(d));
};
Math.degCos = function (d) {
    return Math.cos(Math.degRad(d));
};


var allSeasons = ['Proloće', 'Leto', 'Jesen', 'Zima'];

var getCurrentSeaoson = function () {
    var mine = Date.getSeasons(),
		today = new Date(),
		firstSpring = mine[1],
		firstSummer = mine[2],
		firstFall = mine[3],
		firstWinter = mine[4],
		season = '';

    if (today >= firstSpring && today < firstSummer) {
        return allSeasons[0][0].toLowerCase();
    } else if (today >= firstSummer && today < firstFall) {
        return allSeasons[1][0].toLowerCase();
    } else if (today >= firstFall && today < firstWinter) {        
        return allSeasons[2][0].toLowerCase();     
    } else if (today >= firstWinter || today < firstSpring) {
        return allSeasons[3][0].toLowerCase();
    }
}



var iconUrl = 'https://img.icons8.com/external-smashingstocks-flat-smashing-stocks/2x/',
	iconUrl = 'https://img.icons8.com/color-glass/1x/',
	iconNames = {"1":"crab.png","2":"dressed-fish.png","3":"filleted-fish.png","4":"fish-food.png","5":"octopus.png","6":"prawn.png","7":"shellfish.png","8":"shrimp-and-lobster.png","9":"squid.png","10":"whole-fish.png","11":"bok-choy.png","12":"broccoli.png","13":"brocolini1.png","14":"carrot.png","15":"cauliflower.png","16":"celery.png","17":"chard.png","18":"chili-pepper.png","19":"collard-greens.png","20":"corn.png","21":"finocchio.png","22":"greenery-1.png","23":"group-of-vegetables.png","24":"kohlrabi.png","25":"leek.png","26":"mushrooms--1.png","27":"plantain.png","28":"pumpkin.png","29":"soy.png","30":"spinach.png","31":"squash.png","32":"sweet-potato.png","33":"tomato.png","34":"tomatoes.png","35":"vegetables-bag.png","36":"white-beans.png","37":"zucchini.png","38":"no-milk.png","39":"edible.png","40":"low-salt.png","41":"no-apple.png","42":"no-celery.png","43":"no-crustaceans.png","44":"no-eggs.png","45":"no-fish.png","46":"no-fructose.png","47":"no-gmo--v2.png","48":"no-gmo--v1.png","49":"no-gluten.png","50":"no-lupines.png","51":"no-meat.png","52":"no-mustard.png","53":"no-nuts.png","54":"no-peanut.png","55":"no-shellfish.png","56":"no-soy.png","57":"no-sugar.png","58":"non-lactose-food.png","59":"no-sugar2.png","60":"asparagus.png","61":"bad_apple.png","62":"beet.png","63":"breakfast.png","64":"brigadeiro.png","65":"cabbage.png","66":"chupa-chups.png","67":"coffee-beans-.png","68":"cookbook.png","69":"cooking-book.png","70":"cucumber.png","71":"deliver-food.png","72":"diabetic-food.png","73":"dinner.png","74":"egg-stand.png","75":"eggplant.png","76":"empty-jam-jar.png","77":"fast-food-drive-thru.png","78":"fast-moving-consumer-goods.png","79":"firm-tofu.png","80":"fish-skeleton.png","81":"sack-of-flour.png","82":"food-receiver.png","83":"garlic.png","84":"cute-pumpkin.png","85":"kawaii-bread-1.png","86":"kawaii-broccoli.png","87":"kawaii-coffee.png","88":"kawaii-croissant.png","89":"kawaii-cupcake.png","90":"kawaii-egg.png","91":"kawaii-french-fries.png","92":"kawaii-ice-cream--v2.png","93":"kawaii-ice-cream--v1.png","94":"kawaii-jam.png","95":"kawaii-milk.png","96":"kawaii-noodle.png","97":"kawaii-pizza.png","98":"kawaii-shellfish.png","99":"kawaii-soda.png","100":"kawaii-steak.png","101":"kawaii-sushi.png","102":"kawaii-taco.png","103":"baguette.png","104":"bake.png","105":"biscuits.png","106":"bread.png","107":"bread-loaf.png","108":"bread-and-rolling-pin.png","109":"bread-and-rye.png","110":"bavarian-pretzel.png","111":"gingerbread-house.png","112":"merry-pie.png","113":"naan.png","114":"stale-bread.png","115":"blueberry.png","116":"cherry.png","117":"grapes.png","118":"raspberry.png","119":"strawberry.png","120":"ice-cream-in-waffle-cone.png","121":"jam.png","122":"jelly.png","123":"lollipop-candy.png","124":"melting-ice-cream.png","125":"pastel-de-nata.png","126":"strawberry-cheesecake.png","127":"sweets.png","128":"toaster-pastry.png","129":"bagel.png","130":"bento.png","131":"caviar.png","132":"cheese.png","133":"chocolate-spread.png","134":"dim-sum.png","135":"fish-and-chips.png","136":"fondue.png","137":"food-and-wine.png","138":"greek-salad.png","139":"guacamole.png","140":"gyoza.png","141":"lasagna.png","142":"lunchbox.png","143":"noodles.png","144":"omlette.png","145":"paella.png","146":"pancake.png","147":"porridge.png","148":"rice-bowl.png","149":"salad.png","150":"salami-pizza.png","151":"salmon-sushi.png","152":"sandwich-with-fried-egg.png","153":"sauce.png","154":"seafood.png","155":"spaghetti.png","156":"spam-can.png","157":"spring-roll.png","158":"sunny-side-up-eggs.png","159":"sushi.png","160":"tapas.png","161":"tin-can.png","162":"toast.png","163":"wine-and-grapes.png","164":"yogurt.png","165":"coconut-milk.png","166":"coffee-capsule.png","167":"cola.png","168":"green-tea.png","169":"hemp-milk.png","170":"hot-chocolate.png","171":"lemonade.png","172":"milk-bottle.png","173":"milk-carton.png","174":"oat-milk.png","175":"-takeaway-hot-drink.png","176":"tea-pair.png","177":"the-toast.png","178":"warm-drink.png","179":"wine-and-glass.png","180":"asian-street-food.png","181":"box-of-cereal.png","182":"burrito.png","183":"cereal.png","184":"cheeseburger.png","185":"chicken-and-waffle.png","186":"chinese-fried-rice.png","187":"chinese-noodle.png","188":"fast-food.png","189":"french-fries.png","190":"fried-chicken.png","191":"fry.png","192":"hamburger.png","193":"hot-dog.png","194":"kfc-chicken.png","195":"mcdonalds-french-fries.png","196":"nachos.png","197":"pizza.png","198":"pizza-five-eighths.png","199":"plastic-food-container.png","200":"popcorn.png","201":"potato-chips.png","202":"quesadilla.png","203":"refreshments.png","204":"sandwich.png","205":"street-food.png","206":"taco.png","207":"take-away-food.png","208":"wrap.png","209":"apple.png","210":"apples--plate.png","211":"apples_plate_1.png","212":"apricot.png","213":"avocado.png","214":"bad-banana.png","215":"bad-orange.png","216":"bad-pear.png","217":"banana.png","218":"citrus-1.png","219":"citrus.png","220":"coconut.png","221":"cutted-melon.png","222":"cutted-watermelon.png","223":"date-fruit.png","224":"dragon-fruit.png","225":"durian.png","226":"fig-fruit.png","227":"fruit-bag.png","228":"group-of-fruits.png","229":"half-orange.png","230":"jackfruit.png","231":"lime.png","232":"lychee.png","233":"mango.png","234":"mangosteen.png","235":"melon.png","236":"orange.png","237":"papaya.png","238":"pineapple.png","239":"pomegranate.png","240":"rambutan.png","241":"slice-of-watermelon.png","242":"soursop.png","243":"tangelo.png","244":"watermelon.png","245":"whole-apple.png","246":"whole-melon.png","247":"whole-watermelon.png","248":"almond-butter.png","249":"basil.png","250":"black-peper.png","251":"bread-crumbs.png","252":"bulk-spices.png","253":"butter.png","254":"cinnamon-sticks.png","255":"cloves.png","256":"dozen-eggs.png","257":"dressing.png","258":"egg-basket.png","259":"egg-carton.png","260":"ketchup.png","261":"lentil.png","262":"ingredients-list.png","263":"maple-syrup.png","264":"matcha.png","265":"mayonnaise.png","266":"mozzarella.png","267":"mustard.png","268":"olive-oil.png","269":"olive-oil-bottle.png","270":"peanut-butter.png","271":"pepitas.png","272":"pistachio-sauce.png","273":"rice-vinegar.png","274":"rolled-oats.png","275":"salt.png","276":"salt-shaker.png","277":"sauce-bottle.png","278":"sesame.png","279":"sesame-oil.png","280":"soy-sauce.png","281":"pepper-shaker.png","282":"spoon-of-sugar.png","283":"sugar.png","284":"sugar-cube.png","285":"sugar-cubes.png","286":"sunflower-butter.png","287":"sunflower-oil.png","288":"sweetener.png","289":"thyme.png","290":"vegetable-bouillion-paste.png","291":"whipped-cream.png","292":"worcestershire-sauce.png","293":"bacon.png","294":"steak-well-done.png","295":"barbeque--v1.png","296":"steak-medium.png","297":"iranian-kebab--v2.png","298":"iranian-kebab--v1.png","299":"jamon.png","300":"kebab.png","301":"poultry-leg.png","302":"roast.png","303":"sausage.png","304":"sausages.png","305":"souvla.png","306":"steak.png","307":"steak-hot.png","308":"steak-very-hot.png","309":"thanksgiving.png","310":"caloric-energy.png","311":"carbohydrates.png","312":"fiber.png","313":"halal-sign.png","314":"healthy-eating.png","315":"healthy-food.png","316":"healthy-food-calories-calculator.png","317":"lipids.png","318":"natural-food.png","319":"non-vegetarian-food-symbol.png","320":"organic-food.png","321":"paleo-diet.png","322":"protein.png","323":"sodium.png","324":"vegan-food.png","325":"vegetarian-food.png","326":"vegetarian-food-symbol.png","327":"brazil-nut.png","328":"ceshew.png","329":"nut.png","330":"pistachios.png","331":"birthday-cake.png","332":"cake.png","333":"cinnamon-roll.png","334":"cookie.png","335":"cookies.png","336":"croissant.png","337":"cupcake.png","338":"doughnut.png","339":"macaron.png","340":"pie.png","341":"samosa.png","342":"grocery-bag.png","343":"grocery-shelf.png","344":"halal-food.png","345":"haram-food.png","346":"hazelnut.png","347":"ice-icon.png","348":"international-food.png","349":"kiwi.png","350":"lettuce.png","351":"low-cholesterol-food.png","352":"lunch.png","353":"mushbooh-food.png","354":"mushroom.png","355":"nonya-kueh.png","356":"olive.png","357":"onion.png","358":"paprika.png","359":"peach.png","360":"peanuts.png","361":"pear.png","362":"peas.png","363":"picnic--v2.png","364":"picnic--v1.png","365":"plum.png","366":"potato.png","367":"rack-of-lamb.png","368":"radish.png","369":"real-food-for-meals.png","370":"salami.png","371":"silken-tofu.png","372":"soup-plate.png","373":"spoiled-food.png","374":"stir.png","375":"tempeh.png","376":"tiffin.png","377":"burger-dip.png","378":"wicker-basket.png","379":"eggs.png","380":"flax-seeds.png","381":"flour-in-paper-packaging.png","382":"flour-of-rye.png","383":"ginger.png","384":"grains-of-rice.png","385":"hamper.png","386":"honey.png","387":"honey-spoon.png","388":"icing-sugar.png","389":"ingredients.png","390":"ingredients-for-cooking.png","391":"apple-jam.png","392":"banana-split.png","393":"berry-jam.png","394":"candy.png","395":"cheesecake.png","396":"cherry-cheesecake.png","397":"chocolate-bar.png","398":"cotton-candy.png","399":"dessert.png","400":"ice-cream-cone.png","401":"ice-cream-bowl.png","402":"ice-cream-in-waffle.png"},	
	iconUrl = 'https://img.icons8.com/color/1x/',
	iconNames = {"1":"cute-pumpkin.png","2":"kawaii-bread-1.png","3":"kawaii-coffee.png","4":"kawaii-cupcake.png","5":"kawaii-egg.png","6":"kawaii-french-fries.png","7":"kawaii-ice-cream.png","8":"kawaii-pizza.png","9":"kawaii-soda.png","10":"kawaii-steak.png","11":"kawaii-sushi.png","12":"kawaii-taco.png","13":"baguette.png","14":"bake.png","15":"bread.png","16":"bavarian-pretzel.png","17":"gingerbread-house.png","18":"merry-pie.png","19":"naan.png","20":"pretzel.png","21":"sliced-bread.png","22":"stale-bread.png","23":"blueberry.png","24":"cherry.png","25":"grapes.png","26":"raspberry.png","27":"strawberry.png","28":"banana-split.png","29":"candy.png","30":"cheesecake.png","31":"cherry-cheesecake.png","32":"chocolate-bar.png","33":"chocolate-bar-white.png","34":"cotton-candy.png","35":"dessert.png","36":"gummy-bear.png","37":"ice-cream-cone.png","38":"ice-cream-bowl.png","39":"jam.png","40":"jelly.png","41":"melting-ice-cream.png","42":"pastel-de-nata.png","43":"strawberry-cheesecake.png","44":"sweets.png","45":"toaster-pastry.png","46":"bagel.png","47":"bento.png","48":"caviar--v2.png","49":"caviar--v1.png","50":"cheese.png","51":"chocolate-spread.png","52":"dim-sum.png","53":"dolmades.png","54":"dumplings.png","55":"fondue.png","56":"food-and-wine.png","57":"greek-salad.png","58":"gyoza.png","59":"kimchi.png","60":"lasagna.png","61":"lunchbox.png","62":"noodles.png","63":"omlette.png","64":"paella.png","65":"pancake.png","66":"porridge.png","67":"rice-bowl.png","68":"salad.png","69":"sauce.png","70":"spaghetti.png","71":"spam-can.png","72":"spring-roll.png","73":"sunny-side-up-eggs.png","74":"sushi.png","75":"tapas.png","76":"tin-can.png","77":"yogurt.png","78":"coconut-milk.png","79":"coffee-capsule.png","80":"cola.png","81":"green-tea.png","82":"hemp-milk.png","83":"lemonade.png","84":"milk-bottle.png","85":"milk-carton.png","86":"oat-milk.png","87":"tea-pair.png","88":"wine-and-glass.png","89":"bao-bun.png","90":"bitten-sandwich.png","91":"cereal.png","92":"chicken-and-waffle.png","93":"french-fries.png","94":"fry.png","95":"hamburger.png","96":"hot-dog.png","97":"mcdonalds-french-fries.png","98":"nachos.png","99":"pizza.png","100":"pizza-five-eighths.png","101":"plastic-food-container.png","102":"popcorn.png","103":"potato-chips.png","104":"quesadilla.png","105":"refreshments.png","106":"sandwich.png","107":"taco.png","108":"wrap.png","109":"apple.png","110":"apples--plate.png","111":"apples_plate_1.png","112":"apricot.png","113":"avocado.png","114":"bad-banana.png","115":"bad-orange.png","116":"bad-pear.png","117":"banana.png","118":"citrus.png","119":"coconut.png","120":"cutted-melon.png","121":"date-fruit.png","122":"dragon-fruit.png","123":"durian.png","124":"fruit-bag.png","125":"goyave.png","126":"group-of-fruits.png","127":"half-orange.png","128":"jackfruit.png","129":"lime.png","130":"lychee.png","131":"mango.png","132":"mangosteen.png","133":"melon.png","134":"orange.png","135":"papaya.png","136":"peeled-banana.png","137":"pineapple.png","138":"pomegranate.png","139":"slice-of-watermelon.png","140":"soursop.png","141":"tangelo.png","142":"watermelon.png","143":"whole-apple.png","144":"whole-melon.png","145":"whole-watermelon.png","146":"almond-butter.png","147":"basil.png","148":"black-peper.png","149":"black-sesame-seeds.png","150":"bread-crumbs.png","151":"bulk-spices.png","152":"butter.png","153":"chia-seeds.png","154":"cinnamon-sticks.png","155":"cloves.png","156":"curry.png","157":"dozen-eggs.png","158":"egg-basket.png","159":"egg-carton.png","160":"eggs.png","161":"flax-seeds.png","162":"flour-in-paper-packaging.png","163":"ginger.png","164":"grains-of-rice.png","165":"granulated-garlic.png","166":"hamper.png","167":"honey.png","168":"honey-dipper-with-honey-dripping.png","169":"honey-spoon.png","170":"ingredients.png","171":"ingredients-for-cooking.png","172":"lentil.png","173":"ingredients-list.png","174":"maple-syrup.png","175":"matcha.png","176":"mint.png","177":"mozzarella.png","178":"mustard.png","179":"olive-oil.png","180":"olive-oil-bottle.png","181":"peanut-butter.png","182":"pepitas.png","183":"pistachio-sauce.png","184":"quorn.png","185":"raisins.png","186":"rice-vinegar.png","187":"rolled-oats.png","188":"salt.png","189":"salt-shaker.png","190":"sauce-bottle.png","191":"sesame.png","192":"sesame-oil.png","193":"smoked-paprika.png","194":"soy-sauce.png","195":"pepper-shaker.png","196":"spoon-of-sugar.png","197":"sugar.png","198":"sugar-cube.png","199":"sugar-cubes.png","200":"sunflower-butter.png","201":"sunflower-oil.png","202":"sweetener.png","203":"thyme.png","204":"tumeric.png","205":"vegetable-bouillion-paste.png","206":"white-sesame-seeds.png","207":"bacon.png","208":"steak-medium.png","209":"cuts-of-beef.png","210":"cuts-of-pork.png","211":"jamon.png","212":"kebab.png","213":"roast.png","214":"sausages.png","215":"souvla.png","216":"steak.png","217":"thanksgiving.png","218":"caloric-energy.png","219":"carbohydrates.png","220":"fiber.png","221":"healthy-food.png","222":"healthy-food-calories-calculator.png","223":"lipids.png","224":"natural-food.png","225":"non-vegetarian-food-symbol.png","226":"organic-food.png","227":"protein.png","228":"sodium.png","229":"starving.png","230":"vegan-food.png","231":"vegetarian-food.png","232":"vegetarian-food-symbol.png","233":"vegetarian-mark.png","234":"brazil-nut.png","235":"ceshew.png","236":"nut.png","237":"pecan.png","238":"birthday-cake.png","239":"cake.png","240":"cinnamon-roll.png","241":"cookie.png","242":"cookies.png","243":"croissant.png","244":"cupcake.png","245":"doughnut.png","246":"korean-rice-cake.png","247":"macaron.png","248":"pie.png","249":"samosa.png","250":"crab.png","251":"fish-food.png","252":"octopus.png","253":"prawn.png","254":"shellfish.png","255":"artichoke.png","256":"bok-choy.png","257":"broccoli.png","258":"brocolini1--v1.png","259":"carrot.png","260":"cauliflower.png","261":"celery.png","262":"chard.png","263":"chili-pepper.png","264":"collard-greens.png","265":"corn.png","266":"finocchio.png","267":"gailan.png","268":"group-of-vegetables.png","269":"kale.png","270":"kohlrabi.png","271":"leek.png","272":"plantain.png","273":"pumpkin.png","274":"soy.png","275":"spinach.png","276":"squash.png","277":"sweet-potato.png","278":"tomato.png","279":"tomatoes.png","280":"vegetables-bag.png","281":"white-beans.png","282":"you-choy.png","283":"zucchini.png","284":"no-milk.png","285":"edible.png","286":"inedible.png","287":"low-salt.png","288":"no-apple.png","289":"no-celery.png","290":"no-crustaceans.png","291":"no-eggs.png","292":"no-fish.png","293":"no-fructose.png","294":"no-gmo.png","295":"no-gluten.png","296":"no-lupines.png","297":"no-meat.png","298":"no-mustard.png","299":"no-nuts.png","300":"no-peanut.png","301":"no-sesame.png","302":"no-shellfish.png","303":"no-soy.png","304":"no-sugar.png","305":"no-sugar2.png","306":"asparagus.png","307":"bad_apple.png","308":"beet.png","309":"biting-a-carrot.png","310":"breakfast.png","311":"brigadeiro.png","312":"butter--churn.png","313":"cabbage.png","314":"cookbook.png","315":"cucumber.png","316":"deliver-food.png","317":"dinner.png","318":"edamame.png","319":"eggplant.png","320":"empty-jam-jar.png","321":"firm-tofu.png","322":"sack-of-flour.png","323":"food-donor.png","324":"food-receiver.png","325":"garlic.png","326":"grocery-bag.png","327":"grocery-shelf.png","328":"gum.png","329":"hazelnut.png","330":"heinz-beans.png","331":"ice-icon.png","332":"kiwi.png","333":"kombucha.png","334":"lettuce.png","335":"lunch.png","336":"mushroom.png","337":"nonya-kueh.png","338":"olive.png","339":"onion.png","340":"paprika.png","341":"peach.png","342":"peanuts.png","343":"pear.png","344":"peas.png","345":"picnic.png","346":"plum.png","347":"potato.png","348":"rack-of-lamb.png","349":"radish.png","350":"real-food-for-meals.png","351":"sabzeh.png","352":"salami.png","353":"silken-tofu.png","354":"soup-plate.png","355":"spoiled-food.png","356":"stir.png","357":"tempeh.png"},	
	json = {
		"foods": [
			{
				"name": "Specle",
				"icon": "86",
				"rating": "5",
				"cat": "Doe"
			},
			{
				"name": "Kavijar",
				"icon": "74",
				"rating": "1",
				"cat": "Doe"
			},
			{
				"name": "Kavijar",
				"icon": "74",
				"rating": "1",
				"cat": "Doe",
				"last": "15.Januar.2023",
			},
			{
				"name": "Lignje",
				"icon": "76",
				"rating": "5",
				"cat": "Doe"
			},
			{
				"name": "Punjene paprike",
				"icon": "1",
				"rating": "5",
				"cat": "Doe"
			},
			{
				"name": "Przena piletina",
				"icon": "194",
				"rating": "5",
				"cat": "Doe",
				"last": "12.Januar.2023",
			},
			{
				"name": "Pizza",
				"icon": "197",
				"rating": "4",
				"cat": "Doe",
				"last": "14.Januar.2023",
			},
			{
				"name": "Piletina",
				"icon": "301",
				"rating": "3",
				"cat": "Doe",
				"last": "17.Januar.2023",
			},
			{
				"name": "Ramen supa",
				"icon": "152",
				"rating": "2",
				"cat": "Doe"
			},
			{
				"name": "Makarone sa sirom",
				"icon": "114",
				"rating": "4",
				"cat": "Doe"
			},
			{
				"name": "Grasak",
				"icon": "18",
				"rating": "5",
				"cat": "Doe"
			},
			{
				"name": "Pecurke u sosu",
				"icon": "57",
				"rating": "3",
				"cat": "Doe"
			},
			{
				"name": "Rinflajs",
				"icon": "74",
				"rating": "2",
				"cat": "Doe"
			},
			{
				"name": "Cufte",
				"icon": "175",
				"rating": "1",
				"cat": "Doe"
			}
		]
	};

var foods = json["foods"];


const weekdays = ["Nedelja", "Ponedeljak", "Utorak", "Sreda", "Četvrtak", "Petak", "Subota"];
const months = ["Januar","Februar","Mart","April","Maj","Jun","Jul", "Avgust", "Septembar", "Oktobar", "Novembar", "Decembar"];

function GetDates(startDate, daysToAdd) {
    var aryDates = [];
	
	 for(var i = 0; i <= daysToAdd; i++) {
        var currentDate = new Date(),
			month = currentDate.getMonth();
        currentDate.setDate(startDate.getDate() - i);
		
        aryDates.push(DayAsString(currentDate.getDay()) + '.' + currentDate.getDate() + '.' + months[month] + '.' + currentDate.getFullYear());
    }
	
	aryDates = aryDates.reverse();	

    for(var i = 0; i <= daysToAdd-1; i++) {
        var currentDate = new Date(),
			month = currentDate.getMonth();
        currentDate.setDate(startDate.getDate() + 1 + i);
        aryDates.push(DayAsString(currentDate.getDay()) + '.' + currentDate.getDate() + '.' + months[month] + '.' + currentDate.getFullYear());
    }
	
    
    return aryDates;
}


function DayAsString(dayIndex) {
    
    
    return weekdays[dayIndex];
}

var startDate = new Date();


var aryDates = GetDates(startDate, 3);

console.log( aryDates );

var cal = $("#mini-calender"),
	foodWrapper = $(".food-wrapper");

var selDate = $(".selected-date");

var sliced = aryDates[3].split('.');


function checkString ( last ) {
	
	
	var separated = [];
	
	
	for (let i = 0; i < json['foods'].length; i++) {		
		if( json['foods'][i].hasOwnProperty('last') && last.indexOf( json['foods'][i]['last'] ) > -1 ) {		
			separated.push(json['foods'][i]);
		}
	}
	
	
	return separated;
	
	
}





for (var id in iconNames) {
    if (iconNames.hasOwnProperty(id)) {
		$('.icon-container').append('<div data-icon-id="'+id+'" class="icon"><img data-src="'+iconUrl+iconNames[id]+'"></div>');
    }
}


var foodList = $('.section[data-cat="foods"] .food-list');
function getFoodHtml ( cat, icon, name, rating, arrayIndex , edit = true ) {
	var food = '<div data-array-index="'+arrayIndex+'" class="food" data-cat="'+cat+'"><div class="icon"><img data-src="'+iconUrl+iconNames[icon]+'"></div><div class="food-side"><div class="food-name"><span>'+name+'</span></div><div class="food-rating"><i data-star="'+rating+'"></i></div>';
	
	if( edit ) {
		food += '<div class="food-edit"><span class="material-symbols-rounded">more_vert</span></div>';
	}
	
	food += '</div></div>';
	
	return food;
}

for (let i = 0; i < json['foods'].length; i++) {
	var	currentFood = json['foods'][i];
	foodList.append(getFoodHtml(currentFood.cat, currentFood.icon, currentFood.name, currentFood.rating, i));
}


for (let i = 0; i < aryDates.length; i++) {
	var weekArray = aryDates[i].split('.'),
		weekday = weekArray[0],
		day = weekArray[1],
		month = weekArray[2],
		year = weekArray[3],
		today = (weekArray[1] == startDate.getDate())? " today active": "",
		previousDays = (i < 3)? " prev": "",
		nextDays = (i > 3)? " next": "";
		
		var foodByDate = $('<div data-weekday="'+weekday+'" class="food-by-date'+today+previousDays+nextDays+'"><div class="selected-date"></div><div class="food-list empty"><img src="images/shine-young-woman-meditating-in-nature-surrounded-by-butterflies-1.png"><div class="selected">Preskočen ručak na ovaj dan.</div></div></div>').appendTo(foodWrapper),
			foodList = foodByDate.find('.food-list'),
			selDate = foodByDate.find('.selected-date');
			
			selDate.append(weekday + ', ' + day + '. ' + month);
		
		
		
		
		
		
		var separated = checkString(aryDates[i]);
		if( separated.length ) {
			
			for (let r = 0; r < separated.length; r++) {
				var food = separated[r];				
				
				foodList.removeClass('empty').html('').append(getFoodHtml(food.cat, food.icon, food.name, food.rating, false));
			}
		}
		
	cal.append('<div data-weekday="'+weekday+'" class="date'+today+previousDays+nextDays+'"><div class="date-wrap"><span class="week">'+weekday.slice(0,3)+'</span><span class="day">'+day+'</span></div></div>');
}


var foodList = $(".food-list");



$(window).on( 'load', function() {
	$('#preloader').fadeOut();
});


$('body').on('click', '.date:not(.active)', function() {
	var weekday = $(this).data('weekday');
	
	
	
	$('.date.active, .food-by-date.active').removeClass("active");
	$(this).addClass("active");
	
	$('.food-wrapper .food-by-date[data-weekday="'+weekday+'"]').addClass('active');
	
	updateAssets('.food-wrapper img[data-src], .section[data-cat="foods"] img[data-src]:visible');
	
	
}).on('click', '.menu-button:not(.active)', function() {
	var cat = $(this).data('cat');
	
	
	$('.menu-button.active, .section.active').removeClass("active");
	$(this).addClass("active");
	
	$('.section[data-cat="'+cat+'"]').addClass('active');
	
	updateAssets('.food-wrapper img[data-src], .section[data-cat="foods"] img[data-src]:visible');
	
	
}).on('click', '#add_new_food, .food-edit', function() {
	
	let food = $(this).closest('.food'),
		arrayIndex = food.attr('data-array-index'),
		iconCont = $('.icon-container').scrollTop(0),
		foodEditor = $('#food-editor').removeClass("editing");
		
	
	// Reset values
	iconCont.find(".active").removeClass("active");
	$('#food-name').val( "" );
	$('.editor-inner .food-rating').attr( 'current-stars', 5 );	
	
	
	if ( food.length ) {
		
		let foodName = food.find('.food-name span').text(),
			rating = food.find('[data-star]').attr('data-star'),
			icon = food.find('.icon img').attr('src');
			
		foodEditor.addClass("editing").fadeIn(300).find(".save").attr('data-array-index',arrayIndex);
			
		$('#food-name').val( food.find('.food-name span').text() );
		$('.editor-inner .food-rating').attr( 'current-stars', food.find('[data-star]').attr('data-star') );
		
		$('.icon-container .icon.active').removeClass("active");
		var foundicon = $('.icon-container img[data-src="'+icon+'"],.icon-container img[src="'+icon+'"]').closest(".icon").addClass('active');
		
		//console.log( foundicon );
		setTimeout((function() {
			iconCont.scrollTop(0)
			var scroll = foundicon.offset().top - iconCont.offset().top - (iconCont.height()/2  - 32 );
			iconCont.scrollTop( scroll )
		}),300);
	} else {
		foodEditor.fadeIn(300)
		$('#food-name').focus()
	}
	
	updateAssets('#food-editor img[data-src]:visible');	
	
}).on('click', '.editor-inner .icon i', function() {
	var numberOfStars = $(this).index();
	
	$(this).closest(".food-rating").attr("current-stars", numberOfStars+1);
	
}).on('click', '.editor-inner .icon:not(.active)', function() {
	$(this).closest('.icon-container').find(".active").removeClass("active");
	
	$(this).addClass("active");
	
}).on('click', 'button.cancel', function() {
	$('#food-editor').fadeOut();
	
}).on('click', 'button.save', function() {
	if( $('#food-editor').hasClass("editing") ) {
		var arrayIndex = $(this).attr("data-array-index");	
		
		console.log(json["foods"][parseInt(arrayIndex)])
	} else {
		console.log( "add new food" );
	}
	
	$('#food-editor').fadeOut(300);
	
});








function updateAssets(el) {
	if( $(el).length === 0 ) return;	
	var windowHeight = $( window ).height();
	var topOfWindow = $(window).scrollTop();
	$(el).each(function(){
		var thisPos = $(this).offset().top;
		
		if ( (topOfWindow + windowHeight - 100 ) > thisPos ) {

			var asset = $(this),
				newImg = new Image();				

				newImg.onload = function() {
					asset.attr('src', $(this).attr('src') ).removeAttr('data-src');
				};
				newImg.src = asset.attr('data-src');
		}
	});


	
}

updateAssets('.food-wrapper img[data-src], .section[data-cat="foods"] img[data-src]:visible');

$('.section[data-cat="foods"] .food-list, .icon-container').scroll(function() {
	updateAssets('.food-wrapper img[data-src], .section[data-cat="foods"] img[data-src]:visible, .icon-container img[data-src]:visible');
});













