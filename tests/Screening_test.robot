*** Settings ***
Library           SeleniumLibrary
Library           Collections
Library           String
Library           OperatingSystem

*** Settings ***
Documentation       Stockbit Login Tests
Resource            ../pages/landing_page.robot
Resource            ../pages/login_page.robot
Resource            ../pages/home_page.robot
Resource            ../steps/login_steps.robot
Resource            ../pages/trading_area_page.robot


*** Variables ***
${validUsername}    m.izzul.h.w@gmail.com
${validPassword}    mwafiudin165    
${data_watchlist}
${result_filtered}    ${EMPTY}

*** Test Cases ***
Scenario 1: Valid login credential
    Login page opened (shortcut)
    User input username and password   ${validUsername}    ${validPassword}
    Click login button
    User directed to home page 

    Run Keyword And Ignore Error    Click Element    xpath=//*[@id="modalnewavatar-button-skip"]

Scenario 2: Screening Watchlist Page
    User click menu Watchlist
    User should be directed to Watchlist page
    Sleep    2.5
    Double Click Element    //*[@id="main-container"]/div/div[2]/div[2]/div/div/div/div/div/div/div/div/table/thead/tr/th[2]
    Sleep    1
    Wait Until Element Is Visible          xpath://*[@id="main-container"]/div/div[2]/div[2]/div/div/div/div/div/div/div/div/table
    
    ${row_count}     Get Element Count     xpath://*[@id="main-container"]/div/div[2]/div[2]/div/div/div/div/div/div/div/div/table/tbody/tr
    ${tabel_cell}    Get Table Cell        xpath://*[@id="main-container"]/div/div[2]/div[2]/div/div/div/div/div/div/div/div/table    ${row_count}    1
    ${data_watchlist}    Create List
    ${data_order}        Create List

    FOR    ${element}    IN RANGE    2    ${row_count}+2
        ${c1_cell}    Get Table Cell    xpath://*[@id="main-container"]/div/div[2]/div[2]/div/div/div/div/div/div/div/div/table    ${element}    1
        ${c2_cell}    Get Table Cell    xpath://*[@id="main-container"]/div/div[2]/div[2]/div/div/div/div/div/div/div/div/table    ${element}    2
        
        #Data Cleaning #1
        ${c1}    Split String                  ${c1_cell}    \n    3
        ${c2}    Remove String Using Regexp    ${c2_cell}    [,\n▲▼\(+\)%]           
        ${c2}    Split String                  ${c2}
        
        # Indeks yang kosong agar tetep terisi
        ${c1_length}    Get Length    ${c1}
        ${c2_length}    Get Length    ${c2}
        Run Keyword If    ${c1_length} < 3    Append To List    ${c1}    NULL
        Run Keyword If    ${c2_length} < 3    Append To List    ${c2}    0
        
        #Buat List Watchlist
        ${result_all}    Create List    ${c1[0]}    ${c1[1]}    ${c1[2]}    ${c2[0]}    ${c2[1]}    ${c2[2]}
        Append To List    ${data_watchlist}    ${result_all}
        
        #Filter Data 1
        ${result_filtered}    Create List
        Run Keyword If    ${result_all[3]} >= 100 and ${result_all[3]} <= 2200 and ${result_all[5]} >= 5    
        ...    Append To List    ${result_filtered}    ${result_all[0]}    ${result_all[1]}    ${result_all[2]}    ${result_all[3]}    ${result_all[4]}    ${result_all[5]}
        
        ${result_filtered_len}    Get Length    ${result_filtered}
        Run Keyword If    ${result_filtered_len} != 0
        ...    Append To List    ${data_order}    ${result_filtered}
        
        #Filter Data 2 (Fraksi)     
    END
    
    Log List    ${data_watchlist}
    Log List    ${data_order}



    
