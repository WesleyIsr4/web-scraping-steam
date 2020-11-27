const cheerio = require("cheerio");
const axios = require("axios").default;

const scrapSteam = async () => {
  const steamUrl = "https://www.magazineluiza.com.br/busca/notebook/";

  const html = await fethHtml(steamUrl);

  const selector = cheerio.load(html);

  const searchResults = selector("body").find(
    "#productShowcaseSearch > div[class = 'searchproductShowCaseContent'] > li"
  );

  const deals = searchResults
    .map((idx, el) => {
      const elementSelector = selector(el);
      return extractDeal(elementSelector);
    })
    .get();

  return deals;
};

const fethHtml = async (url) => {
  try {
    const { data } = await axios.get(url);
    return data;
  } catch {
    console.error(
      `ERROR: An error occurred while trying to fetch the URL: ${url}`
    );
  }
};

const extractDeal = (selector) => {
  const title = selector
    .find(".product")
    .find("div[class = 'product-li'] > div[class = 'productTitle']")
    .text()
    .trim();

  console.log(title);

  // const releaseDate = selector
  //   .find(".SearchPage_SearchList__HL7RI col")
  //   .find("div[class='col search_released responsive_secondrow']")
  //   .text()
  //   .trim();

  // const link = selector.attr("href").trim();

  // const priceSelector = selector
  //   .find(
  //     "div[class='col search_price_discount_combined responsive_secondrow']"
  //   )
  //   .find("div[class='col search_price discounted responsive_secondrow']");

  // const originalPrice = priceSelector.find("span > strike").text().trim();

  // const pricesHtml = priceSelector.html().trim();
  // const matched = pricesHtml.match(/(<br>(.+\s[0-9].+.\d+))/);

  // const discountedPrice = matched[matched.length - 1];

  return {
    title,
    // releaseDate,
    // originalPrice,
    // discountedPrice,
    // link,
  };
};

module.exports = scrapSteam;
