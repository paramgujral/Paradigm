import { test, expect } from '@playwright/test';

import { testData } from '../data.mjs';
import { InitApp } from '../pages/initapp.mjs';
import { DesignBuy } from '../pages/designbuy.mjs';
import { WindowType } from '../pages/windowstype.mjs';
import { WindowDesign } from '../pages/windowsdesign.mjs';
import { MostPopular } from '../pages/mostpopular.mjs';
import { CustomWindow } from '../pages/customwindow.mjs'

test.describe('Menards Tests', () => {

  test.only('Design window with nailing by instore user login', async ({ page }) => {
    await new InitApp(page).open(testData.url);
    await new InitApp(page).InitiateApp("Windows", testData.appType, "Instore");
    await new DesignBuy(page).navigateToStartDesign();
    await new WindowType(page).verifyDesignTabHighlighted();
    await new WindowType(page).verifyUserName(testData.appType.firstName);
    await new WindowType(page).verifyProjectTypeOptions();
    await new WindowType(page).selectWindow(testData.projectTypeWithNailing, testData.windowType1);
    await new WindowDesign(page).continueInformation();
    await new WindowDesign(page).designWindow(testData.windowDesign1.sizing, testData.windowDesign1.designOptions, 
      testData.windowDesign1.glassOption, testData.windowDesign1.windowAccessories1 )
  });

  test('Design window without nailing by instore user login', async ({ page }) => {
    await new InitApp(page).open(testData.url);
    await new InitApp(page).InitiateApp("Windows", testData.appType, "Online");
    await new DesignBuy(page).navigateToStartDesign();
    await new WindowType(page).verifyDesignTabHighlighted();
    await new WindowType(page).verifyUserName(testData.appType.firstName);
    await new WindowType(page).verifyProjectTypeOptions();
    await new WindowType(page).selectWindow(testData.projectTypeWithoutNailing, testData.windowType1);
    await new WindowDesign(page).continueInformation();
    await new WindowDesign(page).designWindow(testData.windowDesign1.sizing, testData.windowDesign1.designOptions, 
      testData.windowDesign1.glassOption, testData.windowDesign1.windowAccessories2)
  });

  test('Testing size and styles with instore user login', async ({ page }) => {
    await new InitApp(page).open(testData.url);
    await new InitApp(page).InitiateApp("Windows", testData.appType, "Online");
    await new DesignBuy(page).navigateToStartDesign();
    await new WindowType(page).verifyDesignTabHighlighted();
    await new WindowType(page).verifyUserName(testData.appType.firstName);
    await new WindowType(page).navigateToMostpopularOptions();
    await new WindowType(page).verifyDesignTabHighlighted();
    await new MostPopular(page).verifyPagination();
    await new MostPopular(page).searchUsingSKUNo(testData.skuCodes);
    await new MostPopular(page).searchUsingSKUDes(testData.desc);
    await new MostPopular(page).verifySearchSKUNoRecord("SKUCode", testData.invalidSKUCode);
    //await new MostPopular(page).verifySearchSKUNoRecord("SKUDesc", testData.invalidSKUDesc);
    await new MostPopular(page).verifySKUOnPage();
    await new MostPopular(page).addSKU();
    await new MostPopular(page).deleteAndContinueShoping();
  });
  
  test('Testing Standard Window Parts with instore user login', async ({ page }) => {
    await new InitApp(page).open(testData.url);
    await new InitApp(page).InitiateApp("Windows", testData.appType, "Online");
    await new DesignBuy(page).navigateToStartDesign();
    await new WindowType(page).verifyDesignTabHighlighted();
    await new WindowType(page).verifyUserName(testData.appType.firstName);
    await new WindowType(page).navigateToCustomWindowOptions();
    await new CustomWindow(page).selectCustomeWindow(testData.customWindowWithNailing, testData.customeWindowType);
    ;
  });


});