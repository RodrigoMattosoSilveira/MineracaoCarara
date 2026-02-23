# Cronograma Workflow
The following high level steps are:
1. Planejar - Produce a new chronogram for the selected period;
2. Informar - Informs collaborators about their upcoming period's tasks;
3. Contabilizar - Records the collaborators earnings in the general ledger;

# Planejar
1. The objects used are
   1. Input
      1. Publicados Sheet
      2. Dialog Box
      3. Planejar Sheet
      4. Modelos Sheet
   2. Output
      1. Planejar Sheet
      2. Publicados Sheet, if the planner chose to ignore the proposed Date and Period;
2. The planner triggers the Planejar menu in the Cronogram Google Sheet;
3. The system ensures that the Planejar sheet is empty; if not, it informs the planer about the existing outstanding plan;
4. The system: 
   1. Informs the planer about the existing outstanding plan, if the Planejar sheet is not empty;
   2. Uses the Publicados sheet to construct the next Date and Period to plan; 
   3. Uses the constructed Date and Period to prompts the Planner for whether to Plan or Ignore the proposed date period;
5. The planner can select one of three options:
   1. Cancel - Stop the planning with any further action;
   2. Planejar - The populates the Planejar sheet with all Collaborators, setting their ACAO column as follows:
      1. Includir - When Collaborator is in the Modelo Sheet for the selected Period;
      2. Excluir - When Collaborator is not in the Modelo Sheet for the selected Period;;
   3. Ignorar
      1. The system updates the Publicados Sheet to include the periodo the planer chose to ignore;
6. The planner updates the Planejar sheet, as necessary to reflect the upcoming work plan's requirements;

At this point the workflow, the planner can inform the Collaborators with ACAO equal to Incluir about their upcoming tasks;

# Informar
1. The objects used are
   1. Input
      1. Planejar Sheet
   2. Output
      1. Ativos Sheet
      2. PDF Sheet
2. The planner triggers the Informar menu in the Cronogram Google Sheet; the system:
3. The system :
   1. Informs the planer about the existing outstanding plan, if the Ativos sheet is not empty;;
   2. Copies Planejar Sheet records with ACAO set to Incluir to the Ativos Sheet;
   3. Populates the PDF Sheet with all records in the Ativos Sheet;
   4. Clears the Planejar Sheet;

# Contabilizar - Records the collaborators earnings in the general ledger;
1. The objects used are
   1. Input
      1. Ativos Sheet
   2. Output
      1. Contabilizar Sheet
      2. Publicados Sheet
      3. Modelos Sheet
2. The planner reviews the Ativos Sheet records and 
   1. Adjusts records' attributes as required;
   2. Sets the ACAO of records not to be accounted for to Excluir 
   3. Triggers the Contabilizar menu in the Cronogram Google Sheet;
3. The System:
   1. Copies all records in the Ativos Sheet with their ACAO column set to Incluir to the Contabilizar Sheet;
   2. Process Contabilizar Sheet records, for each record:
      1. If the Collaborator's Methodo is Diaria or Salario:
         1. Add an Earning record;
         2. Delete the record;
      2. ELSE
         1. If the Production Sheet has a record for the well in which the Collaborador worked:
            1. Add an Earning record;
            2. Delete the record;
         2. ELSE
            1. Add a comment to the record indicating that it is waiting for its well production record;	
   3. Updates the Publicados Sheet with the date and period;
   4. Updates the Modelos sheet with the Ativos Sheet records with their ACAO column set to Incluir 
   5. Clears the Ativos Sheet;