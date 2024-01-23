import { assert } from 'console';
import puppeteer from 'puppeteer';

describe('User flow', () => {
  let browser;
  let page;

  beforeEach(async () => {
    browser = await puppeteer.launch({headless: false});
    page = await browser.newPage();
  }, 60000);

  afterEach(async () => {
    await browser.close();
  });

  it('logs in and navigates to a community and a cause', async () => {
    await page.goto('http://localhost:3000/login');

    console.log("Antes de loggearse, no hay tokens relativas a usuarios en la memoria local");
    let userToken = await page.evaluate(() => localStorage.getItem('token'));
    assert(userToken === null, 'Hay una manipulación en el test, ya que hay tokens de usuario en la memoria local');

    await page.type('#username', 'Imanol');
    await page.type('#password', '123456');

    console.log("Escribe en los campos");

    await Promise.all([
      page.click('#submit'),
      page.waitForNavigation()
    ]);

    console.log("Una vez seleccionado el botón de submit, el usuario se encuentra en la página principal");
    let currentPageUrl = await page.url();
    assert(currentPageUrl === 'http://localhost:3000/', 'No se ha redirigido a la página principal, posiblemente debido a algún error durante la operación de loggeo');	

    await Promise.all([
      page.waitForNavigation({ waitUntil: 'networkidle0' }),
      page.goto('http://localhost:3000/comunidades', { timeout: 60000 })
    ]).catch(e => console.log(e));

    console.log("Después de loggearse, hay tokens relativas a usuarios en la memoria local");
    userToken = await page.evaluate(() => localStorage.getItem('token'));
    assert(userToken !== null, 'No se ha encontrado ningún token de usuario en la memoria localHa habido algún problema al loggearse');	
    console.log("Accede a la lista de comunidades");

    page.waitForSelector('#cardComunidad:first-child button', { visible: true });

    await page.click('#cardComunidad:first-child button');

    console.log("Presiona el botón de una comunidad");

    console.log("Accede a una comunidad");

    console.log("Comprobamos que nos encontramos en alguna página con una estructura de localhost:3000/comunidades/:idComunidad");
    currentPageUrl = await page.url();
    assert(currentPageUrl.includes('http://localhost:3000/comunidades/', 'No se encuentra en ninguna página relacionada con las comunidades'));
    assert(currentPageUrl !== 'http://localhost:3000/comunidades', 'No se ha accedido a ninguna comunidad');
  }, 60000);

  it('Tries to log in but the credentials were wrong', async () => {
    await page.goto('http://localhost:3000/login');

    console.log("Antes de loggearse, no hay tokens relativas a usuarios en la memoria local");
    let userToken = await page.evaluate(() => localStorage.getItem('token'));
    assert(userToken === null, 'Hay una manipulación en el test, ya que hay tokens de usuario en la memoria local');

    await page.type('#username', 'Erroneo');
    await page.type('#password', 'Erroneo');

    console.log("Escribe en los campos");

    await Promise.all([
      page.click('#submit'),
      page.waitForNavigation(),
      assert(false, 'Se ha realizado el login con éxito por error')
    ]).catch(e => assert(true));

    console.log("Una vez seleccionado el botón de submit, el usuario sigue en la página de login, nunca fue redirigido a la página principal");
    let currentPageUrl = await page.url();
    assert(currentPageUrl !== 'http://localhost:3000/', 'Se ha realizado el login con éxito por error');
    assert(currentPageUrl === 'http://localhost:3000/login', 'No se ha redirigido a la página de login, posiblemente debido a algún error durante la operación de loggeo');
  }, 60000);
});