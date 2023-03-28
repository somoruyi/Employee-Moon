// Author: SE_Omo

window.addEventListener('load', () => {
    getEmployeesFormTableTwo();
    getCommunicationTableForm();
});

function fetchData(url) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                resolve(JSON.parse(xhr.responseText));
            }
        };

        xhr.onerror = function () {
            reject(new Error("Request failed."));
        };

        xhr.send();
    });
}

function getEmployeesFormTableTwo() {
    fetchData("/TRMS_EmployeeMoon/getEmployeesFormSession.json")
        .then(ePerson => {
            loadEmployeesFormTableTwo(ePerson);
        })
        .catch(error => {
            console.error(error);
        });
}

function getCommunicationTableForm() {
    fetchData("/TRMS_EmployeeMoon/getCommuncationTableSession.json")
        .then(ePerson => {
            loadCommunicationTableForm(ePerson);
        })
        .catch(error => {
            console.error(error);
        });
}

const jsonText = {
    "option1": "Form ID",
    "option2": "Employee ID",
    "option3": "First",
    "option4": "Last",
    "option5": "Employee Id",
    "option6": "Current Date",
    "option7": "Event Date",
    "option8": "Event Time",
    "option9": "Event Location",
    "option10": "Event Cost",
    "option11": "Event Type",
    "option12": "Description",
    "option13": "Grading Format",
    "option14": "Work Related Justification",
    "option15": "Event Attachments",
    "option16": "Work Time Missed",
    "option17": "Estimated Reimbursement",
    "person1": "id",
    "person2": "employeeId",
    "person3": "firstName",
    "person4": "lastName",
    "person5": "employeeId",
    "person6": "currDate",
    "person7": "eventDate",
    "person8": "eventTime",
    "person9": "eventLocation",
    "person10": "eventCost",
    "person11": "eventType",
    "person12": "description",
    "person13": "gradingFormat",
    "person14": "workRelJust",
    "person15": "eventAttachment",
    "person16": "workTimeMissed",
    "person17": "estimatedReimbursement"
};

function loadEmployeesFormTableTwo(ePerson) {
    let formInfo = '';

    for (let i = 0; i < ePerson.length; i++) {
        const person = ePerson[i];
        let html = '<hr>';

        for (let i = 1; i <= Object.keys(jsonText).length / 2; i++) {
            if (jsonText['person' + i] === "firstName") {
                html += `<b>${jsonText['option' + i]} : </b> `;
                html += `<span class="c_emp-style" onclick="loadValues(${person.id}, ${person.employeeId}, ${person.estimatedReimbursement})">`;
                html += `${person[jsonText['person' + i]]} ${person[jsonText['person' + (i + 1)]]}`;
                html += `</span>`;
                i++; // Skip the next key
            } else {
                html += `<b>${jsonText['option' + i]} : </b> `;
                html += `${person[jsonText['person' + i]]}`;
            }

            if (i < Object.keys(jsonText).length / 2) {
                html += ' &nbsp | &nbsp ';
            }
        }

        html += '<hr>';
        formInfo += html;
    }

    document.getElementById("i_employee-table-two-info").innerHTML = formInfo;
}


function loadValues(formId, employeeId, estimatedReimbursement) {
    document.getElementById('i_formId').value = formId;
    document.getElementById('i_employeeId').value = employeeId;
    document.getElementById('i_estimReimbursement').value = estimatedReimbursement;
}

const jsonText2 = {
    "option1": "Form ID",
    "option2": "Employee ID",
    "option3": "Estimated Reimbursement",
    "option4": "Need Additional Info",
    "option5": "Requestee Response",
    "option6": "Altered Reimbursement",
    "option7": "Reason For Altered Amount",
    "option8": "Exceeding Available Funds",
    "option9": "Pending Amount",
    "option10": "Notified Employee",
    "option11": "Employee Option to Cancel",
    "option12": "Approval Status",
    "option13": "Event Grade",
    "option14": "Event Presentation",
    "option15": "Viewed Presentation(Management)",
    "option16": "Approved Presentation(Direct Manager)",
    "option17": "Grade Status(Direct Supervisor)",
    "option18": "Approval (Direct Supervisor)",
    "option19": "Approval (Department Head)",
    "option20": "Final Approval (BenCo)",
    "option21": "Marked Urgent",
    "option22": "Automatic Approval(Direct Supervisor)",
    "option23": "Automatic Approval(Department Head)",
    "option24": "Escalation Emailed to Direct Supervisor",
    "option25": "Final Reimbursement Value",
    "person1": "formId",
    "person2": "employeeId",
    "person3": "estimReimbursement",
    "person4": "requestorNeedAdditionalInfoFrom",
    "person5": "requesteeResponse",
    "person6": "alterReimbursmentAmount",
    "person7": "reasonForLargerAmount",
    "person8": "exceedingAvailableFunds",
    "person9": "pendingAmountVal",
    "person10": "notifyEmployee",
    "person11": "employeeOptionToCancel",
    "person12": "approvalStatus",
    "person13": "eventGrade",
    "person14": "eventPresentation",
    "person15": "mgmtViewPresent",
    "person16": "dirMgrApprPresent",
    "person17": "gradeStatusDirectSup",
    "person18": "directSupAppr",
    "person19": "deptHeadAppr",
    "person20": "bencoFinalAppr",
    "person21": "markedUrgent",
    "person22": "automaticApprovDirectSup",
    "person23": "automaticApprovDeptHead",
    "person24": "escalationEmailDirectSup",
    "person25": "finalReimburseValBenco"
};

function loadCommunicationTableForm(ePerson) {
    let statusInfo = '';
    for (let i = 0; i < ePerson.length; i++) {
        const person = ePerson[i];
        let html = '<hr>';

        for (let i = 1; i <= Object.keys(jsonText2).length / 2; i++) {
            if(i <= 21) {
                html += `<a href="#" class="c_blue-link"> <b>${jsonText2['option' + i]} : </b></a>`;
                html += `<a href="#" class="c_blue-link">${person[jsonText2['person' + i]]}</a>`;
            } else if(i >= 22 && i <= 24) {
                html += `<a href="#" class="c_red-trigger"> <b>${jsonText2['option' + i]} : </b></a>`;
                html += `<a href="#" class="c_red-trigger">${person[jsonText2['person' + i]]}</a>`;
            } else if(i == 25) {
                html += `<br /><a href="#" class="c_green-link"> <b>${jsonText2['option' + i]} : </b></a>`;
                html += `<a href="#" class="c_green-link">${person[jsonText2['person' + i]]}</a>`;
            }
            if (i < Object.keys(jsonText2).length / 2) {
                html += ' &nbsp | &nbsp ';
            }
            if (i == 21) {
                html += '<br />';
            }
        }

        html += '<hr>';
        statusInfo += html;
    }

    document.getElementById("i_employee-table-three-info").innerHTML = statusInfo;

}


