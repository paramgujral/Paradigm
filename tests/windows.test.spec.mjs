import { test, expect } from '@playwright/test';

import { testData } from '../data.mjs';
import { InitApp } from '../pages/initapp.mjs';
import { DesignBuy } from '../pages/designbuy.mjs';
import { WindowType } from '../pages/windowstype.mjs';
import { ProductDesign } from '../pages/productdesign.mjs';
import { MostPopular } from '../pages/mostpopular.mjs';
import { CustomWindow } from '../pages/customwindow.mjs'
import { StandardWindow } from '../pages/standardwindow.mjs'
import { MainTabs } from '..//pages/maintabs.mjs'
import { Summary } from '../pages/summary.mjs';

test.describe('Menards Tests', () => {

  test('Design window with nailing by instore user login', async ({ page }) => {
    await new InitApp(page).open(testData.url);
    await new InitApp(page).InitiateApp("Windows", testData.appType, "Instore");
    await new DesignBuy(page).navigateToStartDesign();
    await new MainTabs(page).verifyDesignTabHighlighted();
    await new WindowType(page).verifyUserName(testData.appType.firstName);
    await new WindowType(page).verifyProjectTypeOptions();
    await new WindowType(page).selectWindow(testData.projectTypeWithNailing, testData.windowType1);
    await new ProductDesign(page).continueInformation();
    await new ProductDesign(page).designWindow(testData.windowDesign1.sizing, testData.windowDesign1.designOptions, 
      testData.windowDesign1.glassOption, testData.windowDesign1.windowAccessories1);
    await new Summary(page).verifyItemOnSummary(testData.windowDesign1.itemDescription1);
    
  });

  test('Design window without nailing by instore user login', async ({ page }) => {
    await new InitApp(page).open(testData.url);
    await new InitApp(page).InitiateApp("Windows", testData.appType, "Online");
    await new DesignBuy(page).navigateToStartDesign();
    await new MainTabs(page).verifyDesignTabHighlighted();
    await new WindowType(page).verifyUserName(testData.appType.firstName);
    await new WindowType(page).verifyProjectTypeOptions();
    await new WindowType(page).selectWindow(testData.projectTypeWithoutNailing, testData.windowType1);
    await new ProductDesign(page).continueInformation();
    await new ProductDesign(page).designWindow(testData.windowDesign1.sizing, testData.windowDesign1.designOptions, 
      testData.windowDesign1.glassOption, testData.windowDesign1.windowAccessories2);
    await new Summary(page).verifyItemOnSummary(testData.windowDesign1.itemDescription2);
  });

  test('Testing size and styles with instore user login', async ({ page }) => {
    await new InitApp(page).open(testData.url);
    await new InitApp(page).InitiateApp("Windows", testData.appType, "Online");
    await new DesignBuy(page).navigateToStartDesign();
    await new MainTabs(page).verifyDesignTabHighlighted();
    await new WindowType(page).verifyUserName(testData.appType.firstName);
    await new WindowType(page).navigateToMostpopularOptions();
    await new MainTabs(page).verifyDesignTabHighlighted();
    await new MostPopular(page).verifyPagination();
    await new MostPopular(page).searchUsingSKUNo(testData.skuCodes);
    await new MostPopular(page).searchUsingSKUDes(testData.desc);
    await new MostPopular(page).verifySearchSKUNoRecord("SKUCode", testData.invalidSKUCode);
    await new MostPopular(page).verifySearchSKUNoRecord("SKUDesc", testData.invalidSKUDesc);
    await new MostPopular(page).verifySKUOnPage();
    await new MostPopular(page).addSKU();
    await new Summary(page).deleteAndContinueShoping();
  });
  
  test('Testing Custom Window Parts with instore user login', async ({ page }) => {
    await new InitApp(page).open(testData.url);
    await new InitApp(page).InitiateApp("Windows", testData.appType, "Online");
    await new DesignBuy(page).navigateToStartDesign();
    await new MainTabs(page).verifyDesignTabHighlighted();
    await new WindowType(page).verifyUserName(testData.appType.firstName);
    await new WindowType(page).navigateToCustomWindowOptions();
    await new MainTabs(page).verifyDesignTabHighlighted();
    await new CustomWindow(page).selectCustomWindow(testData.customWindowWithNailing, testData.CustomWindowType);

  });


  test('Testing Starndard Window Parts with online user login', async ({ page }) => {
    await new InitApp(page).open(testData.url);
    await new InitApp(page).InitiateApp("Windows", testData.appType, "Instore");
    await new DesignBuy(page).navigateToStartDesign();
    await new MainTabs(page).verifyDesignTabHighlighted();
    await new WindowType(page).verifyUserName(testData.appType.firstName);
    await new WindowType(page).navigateToStandardWindowOptions();
    await new MainTabs(page).verifyDesignTabHighlighted();
    await new MostPopular(page).verifyPagination();
    await new StandardWindow(page).verifyPartsInList();
    await new StandardWindow(page).verifyCheckBox();
    await new StandardWindow(page).verifyLeftNavFilter(testData.leftNavFilter1);
    await new StandardWindow(page).verifySearchPart(testData.leftNavFilter1[0].partNumber,'Part Number');
    await new StandardWindow(page).verifySearchPart(testData.partNameSearch,'Part Name');
  });

  test.only('Testing Starndard Window - add parts with online user login', async ({ page }) => {
    await new InitApp(page).open(testData.url);
    await new InitApp(page).InitiateApp("Windows", testData.appType, "Instore");
    await new DesignBuy(page).navigateToStartDesign();
    await new MainTabs(page).verifyDesignTabHighlighted();
    await new WindowType(page).verifyUserName(testData.appType.firstName);
    await new WindowType(page).navigateToStandardWindowOptions();
    await new MainTabs(page).verifyDesignTabHighlighted();
    await new StandardWindow(page).AddPart(testData.partNameToAddPart);
    // await new Summary(page).verifySummaryPage();
    // await new Summary(page).renameDesign("My Design");
    // await new Summary(page).copyDesign(testData.partNameToAddPart);
  });


  test('Testing inaccessibility of Summary screen before added at least one line to a new design', async ({page})=> {
    await new InitApp(page).open(testData.url);
    await new InitApp(page).InitiateApp("Windows", testData.appType, "Online");
    await new DesignBuy(page).navigateToStartDesign();
    await new MainTabs(page).navigatetToSummayBeforAddLineItem();
  })

  // test('Validate Search Saved Design', async ({page})=> {
  //   await new InitApp(page).open(testData.url);
  //   await new InitApp(page).InitiateApp("Windows", testData.appType, "Online");
  //   await new DesignBuy(page).navigateToStartDesign();
    
  // })


});