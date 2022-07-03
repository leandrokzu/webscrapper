const puppeteer = require("puppeteer");

async function Run() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(
    "https://webscraper.io/test-sites/e-commerce/allinone/computers/laptops"
  );

  const links = await page.evaluate(() => {
    let laptops = document.querySelectorAll(".title");

    //salva todos os links de notebooks lenovo
    const links = [];
    laptops.forEach((item) => {
      if (item.title.includes("Lenovo")) {
        links.push(item.href);
      }
    });
    return links;
  });

  let laptops = [];
  for (let i = 0; i < links.length; i++) {
    await page.goto(links[i]);

    const laptop = await page.evaluate(() => {
      const buttons = document.querySelectorAll(".swatches button");

      //seleciona e salva os preços do note por tamanho de HDD
      const pricesPerHdd = {};
      buttons.forEach((btn) => {
        btn.click();
        pricesPerHdd[btn.value] = document.querySelector(".price").innerText;
      });

      //seleciona e retorna os demais dados do note
      return {
        model: document.querySelector(".caption").children[1].innerText,
        description: document.querySelector(".description").innerText,
        pricesPerHdd,
        reviews: parseInt(document.querySelector(".ratings p").innerText),
        stars: document.querySelectorAll(".ratings span").length,
      };
    });

    laptops.push(laptop);
  }
  await browser.close();

  return laptops;
}

module.exports = Run();
