/*


addi $9, $9, 9
add $9, $9, $9
xor $10, $11, $12
j 12
jr $14
sw $15, 7 ($13)
lw $9, 71 ($10)
jal 20
ble $10, $20, 2
slt $10, $10, $12



addi $1, $0, 1
addi $2, $0, 2
addi $3, $0, 3
addi $4, $0, 4
addi $5, $0, 5
addi $6, $0, 6
addi $7, $0, 7
addi $8, $0, 8
addi $9, $0, 9



addi $1, $0, 2
addi $2, $0, 7
sw $2, 0 ($1)
lw $3, 0 ($1)
sw $3, 0 ($2)



addi $1, $0, 2
addi $2, $0, 7
sw $2, 0 ($1)
lw $3, 0 ($1)
add $4, $3, $2

addi $1, $0, 1
addi $2, $0, 2
addi $3, $0, 3
addi $4, $0, 4
sw $1, 0 ($2)
sw $3, 0 ($4)
sw $4, 0 ($1)
lw $5, 0 ($4)
lw $6, 0 ($2)
add $7, $5, $6



addi $1, $0, 1
addi $2, $0, 2
addi $3, $0, 3
addi $4, $0, 4
sw $1, 0 ($2)
sw $3, 0 ($4)
sw $4, 0 ($1)
lw $5, 0 ($4)
lw $6, 0 ($2)
add $7, $5, $6
sw $6, 0 ($5)


addi $1, $0, 2
addi $2, $0, 2
add  $2, $2, $2
jr $1
addi $3, $0, 3




ble $0, $0, 3
addi $1, $0, 1
addi $2, $0, 2
addi $3, $3, 3
addi $4, $4, 4
j 0
addi $5, $5, 5


addi $2, $0, 5
addi $1, $1, 1
ble $1, $2, 2
j 1



addi $2, $0, 5
addi $1, $1, 1
sub $2, $2, $1
ble $2, $1, 2
j 2

*/


var pc_index = document.getElementById('id');
function tobin(s){
    
    var inst = "", reg1 = "", reg2 = "", reg3 = "", imm = "";
	var x = 0;
	var newinst;
	while (s[x] != ' ' && x<s.length)
	{
		inst = inst + s[x]; // got intruction name
		x++;
	}
	if(inst != "j" && inst != "jal" && inst != "addi" && inst != "addiu" && inst != "andi" && inst != "ori" && inst != "xori" && inst != "slti" && inst != "sltiu" && inst != "lw" && inst != "sw" && inst != "beq" && inst != "bne" && inst != "ble" && inst != "add" && inst != "addu" && inst != "sub" && inst != "subu" && inst != "and" && inst != "or" && inst != "xor" && inst != "slt" && inst != "sltu" && inst != "sll" && inst != "srl" && inst != "sra" && inst != "jr")
	{
		console.log("Entered instruction: " +  inst + " is not supported");
		return 0;
	}
	
	while (s[x] == ' ')
		x++;
	x++;  //jumping the space and the dollar sign

    
	if (s[x - 1] != '$'&&inst != "j" &&inst != "jal")
	{
        console.log("Format of instruction: " + inst + " is not correct");
		return 0;
	}
	if (s.search(',') == -1 && inst != "j" && inst != "jal"&& inst != "jr")
	{
        console.log("The registers are not separated by commas in instruction: " + inst);
		return 0;
	}
	
	while (s[x] == ' ')
		x++;

    
	while (s[x] != ',' && inst!="j" && inst!="jal" && x<s.length)
	{
//        console.log("J or j Instruction 1");
		if(isNaN(s[x]))
		{
            console.log("First register of instr: " + inst + " is not in correct format")
            return 0;
		}
		reg1 = reg1 + s[x]; //got first reg
		x++;
	}
	if ((reg1.length > 2 || reg1.length < 1 || parseInt(reg1) > 31) && inst != "j"&&inst != "jal")
	{
//        console.log("J or j Instruction 2");
        console.log("First register of instr: " + inst + " is not in correct format")
		return 0;
	}
	x++; //jumping space
    
    
//    console.log(s.substring(x))
    
    if (inst == "lw" || inst == "sw")
	{
//        console.log(s.substring(x))
//        console.log(reg1)
		if (s.indexOf('(') == -1 || s.indexOf(')') == -1)
		{
            console.log("Format of instruction: " + inst + " is not correct; brackets")
			return 0;
		}
		while (s[x] == ' ')
			x++;
        
		while (s[x] != '(' &&x<s.length)
		{
			if (isNaN(s[x]))
			{
				while (s[x] == ' ')
					x++;
				if (s[x] != '(')
				{
                    console.log("Format of instruction: " + inst + " is not correct; offset")
					return 0;
				}
				else
					x--;
			}
			imm = imm + s[x];
			x++;
		}

//        console.log(reg1)
//        console.log(imm)
        
		x++; x++;
		if (s[x - 1] != '$')
		{     
            console.log("Format of instruction: " + inst + " is not correct; register 2");
            return 0;
		}
        
        

		while (s[x] == ' ')
			x++;
		while (s[x] != ')' && x<s.length)
		{
			if (isNaN(s[x]))
			{
                console.log("Second register of instr: " +  inst  +  " is not in correct format")
                return 0;
			}
			reg2 = reg2 + s[x];
			x++;
		}
        
//        console.log(reg1);
//        console.log(reg2);
//        console.log(imm);
//        
//        console.log(s.substring(x))
		if (reg2.length > 2 || reg2.length < 1 || parseInt(reg2) > 31)
		{
            console.log("Second register of instr: " + inst + " is not in correct format")
			return 0;
		}
	}
	else
	{  
		//storing the jump address as immediate
		if (inst == "j" || inst == "jal"||inst=="jr")
		{
			x= x-2;
			reg2 = "0";
			reg3 = "0";
			if(inst != "jr")
			reg1 = "0";

 			while (x < s.length + 1)
			{
				if (isNaN(s[x]) && x > s.length)
				{   
                    console.log("Address of instruction: " + inst + " is not in the correct format")
					return 0;
				}
				imm = imm + s[x];
				x++;
			}
		}
		else
		{

            while (s[x] == ' ')
				x++;
			if (s[x] != '$')
			{
                console.log("Format of instruction: " + inst + " is not correct");
				return 0;
			}
			x++;
			while (s[x] == ' ')
				x++;
			while (x<s.length && s[x] != ',')
			{
				if (isNaN(s[x]))
				{
                    console.log("Second register of instr: " + inst + " is not in correct format");
					return 0;
				}
				reg2 = reg2 + s[x]; //got first reg
				x++;
				reg3 = "0";
			}
			if (reg2.length > 2 || reg2.length < 1 || parseInt(reg2) > 31)
			{
                console.log("Second register of instr: " + inst + " is not in correct format");
				return 0;
			}
			x++; 
			while (s[x] == ' ')
				x++;
			if (s[x] != '$'&& inst[inst.length - 1] != 'i' && inst != "ble")
			{
                console.log("Format of instruction: " + inst + " is not correct")
				return 0;
			}
			if ((inst == "andi" || inst == "addi" || inst == "ble") && s[x] == '$')
			{
                console.log("There is no immediate for instr: " + inst);
				return 0;
			}
            
            
//            console.log(s.substring(x));

            if((inst != "andi" && inst != "addi" && inst != "ble"))
                x++;
            
			while (s[x] == ' ')
				x++;

//            console.log(s.substring(x));
			while (x < s.length)
			{
				if (inst == "andi" || inst == "addi" || inst == "ble")
				{
					if (isNaN(s[x]))
					{
                        console.log("Immediate of instr: " + inst + " is not in correct format");
						return 0;
					}
				}
				else
				if (isNaN(s[x]) && x > s.length)
				{
                    console.log("Third register of instr: " + inst + " is not in correct format");
					return 0;
				}
				reg3 = reg3 + s[x];
				imm = imm + s[x];
				x++;
			}

			if (reg3.length > 4 || reg3.length < 1 || parseInt(reg3) > 31 )
			{
                console.log("Third register of instr: " + inst + " is not in correct format");
				return 0;
			}
		}
	}
    
    
//    console.log("Instruction : " + inst);
//    console.log()
    var rs, rt, rd, shamt, funct,adr,immd;
	if (inst == "add" || inst == "addu" || inst == "sub" || inst == "subu" || inst == "and" || inst == "or" || inst == "xor" || inst == "slt" || inst == "sltu" || inst == "sll" || inst == "srl" || inst == "sra"||inst=="jr")
	{
		rs = (parseInt(reg2))<< 21; //source 1 *position in instruction
		rt = (parseInt(reg3))<< 16; //source 2
		rd = (parseInt(reg1))<< 11; //destination
		if(imm[0] !='$')
            shamt = (parseInt(imm))<< 6; //shift amount

		//if (long(rd)>31||rs>31||rt>31) //validation reg size
		
		if (inst == "add")
			return rs | rt | rd | (parseInt("32"));
		else
		if (inst == "addu")
			return rs | rt | rd | (parseInt("33"));
		else
		if (inst == "sub")
			return rs | rt | rd | (parseInt("34"));
		else
		if (inst == "subu")
			return rs | rt | rd | (parseInt("35"));
		else
		if (inst == "and")
			return rs | rt | rd | (parseInt("36"));
		else
		if (inst == "or")
			return rs | rt | rd | (parseInt("37"));
		else
		if (inst == "xor")
			return rs | rt | rd | (parseInt("38"));
		else
		if (inst == "slt")
			return rs | rt | rd | (parseInt("42"));
		else
		if (inst == "sltu")
			return rs | rt | rd | (parseInt("43"));
		else
		if (inst == "sll")
		{
			rt = (parseInt(reg2)) << 16;
			return  rt | rd | shamt | (parseInt("0"));
		}
		else
		if (inst == "srl")
		{
			rt = (parseInt(reg2)) << 16;
			return  rt | rd | shamt | (parseInt("2"));
		}
		else
		if (inst == "sra")
		{
			rt = (parseInt(reg2)) << 16;
			return  rt | rd | shamt | (parseInt("3"));
		}
		else
		if (inst == "jr")
		{
			rs = (parseInt(reg1)) << 21;
			return  rs| (parseInt("8"));
		}
		else
			return 0;


	}
	else
	if (inst == "addi" || inst == "addiu" || inst == "andi" || inst == "ori" || inst == "xori" || inst == "slti" || inst == "sltiu" || inst == "lw" || inst == "sw" || inst == "beq" || inst == "bne" || inst == "ble")
	{

		rs = (parseInt(reg2)) << 21; //source 1
		rt = (parseInt(reg1)) << 16; //destination
		immd = (parseInt(imm)) ; //imm

		if (inst == "addi")
			return rs | rt | immd | (parseInt("8")) <<26;
		else
		if (inst == "addiu")
			return rs | rt | immd | (parseInt("9")) << 26;
		else
		if (inst == "andi")
			return rs | rt | immd | (parseInt("12")) << 26;
		else
		if (inst == "ori")
			return rs | rt | immd | (parseInt("13")) << 26;
		else
		if (inst == "xori")
			return rs | rt | immd | (parseInt("14")) << 26;
		else
		if (inst == "slti")
			return rs | rt | immd | (parseInt("10")) << 26;
		else
		if (inst == "sltiu")
			return rs | rt | immd | (parseInt("11")) << 26;
		else
		if (inst == "lw")
			return rs | rt | immd | (parseInt("35")) << 26;
		else
		if (inst == "sw")
			return rs | rt | immd | (parseInt("43")) << 26;
		else
		if (inst == "beq")
			return rs | rt | immd | (parseInt("4")) << 26;
		else
		if (inst == "bne")
			return rs | rt | immd | (parseInt("5")) << 26;
		else
		if (inst == "ble")
			return rs | rt | immd | (parseInt("6")) << 26; //assumed opcode to be 6
		else
			return 0;
	}
	else
	if (inst == "j" || inst == "jal")
	{
		adr = (parseInt(imm));
		if (inst == "j")
			return adr | (parseInt("2")) << 26;
		else
		if (inst == "jal")
			return adr | (parseInt("3")) << 26;
		else
			return 0;
	}
	else
		return 0;
    
    
}
function assemble(){
    
 var lines = editor.getValue().split("\n");
 var table = document.getElementById("iram");  
    
        for(i = 0; i < lines.length; i++){   
            hexString = ("00000000" + (tobin(lines[i])>>>0).toString(16)).substr(-8);
            
            table.rows[i].cells[1].innerText = "0x" + hexString.toUpperCase();
            
//            console.log(hexString);
//            hexNum = parseInt(hexString, 16);
//            console.log(hexNum);
        }       
}

function btb_line(){

    this.pc = 0;
    this.target = 0;
    this.valid = 0;
    this.predict = 0;
}


function CPU(){ 
    
    this.clk = 0;
    
    // IF-IS Stage 
    this.if_is_pc = 0;
    this.if_is_pc_plus4= 0;
    
    // IS-RF Stage
    this.is_rf_instruction = "0x00000000" ;
    this.is_rf_pc = 0;
    
    // RF-EX Stage
    this.rf_ex_r1 = 0;
    this.rf_ex_r2 = 0;
    this.rf_ex_rd = 0;
    this.rf_ex_rt = 0;
    this.rf_ex_imm = 0;
    this.rf_ex_rs = 0;
    this.rf_ex_regwrite= 0;
    this.rf_ex_memtoreg= 0;
    this.rf_ex_memwrite= 0;
    this.rf_ex_alu_funct= 0;
    this.rf_ex_alu_src= 0;
    this.rf_ex_regdst= 0;
    this.rf_ex_jump=0;
    
    // EX-DF Stage
    this.ex_df_r1 = 0;
    this.ex_df_r2 = 0;
    this.ex_df_aluOut = 0;
    this.ex_df_writeData = 0;
    this.ex_df_writeReg = 0;
    this.ex_df_regwrite = 0;
    this.ex_df_memtoreg = 0;
    this.ex_df_memwrite = 0;
    this.ex_df_alu_funct= 0;
    this.ex_df_alu_src= 0;
    this.ex_df_regdst= 0;
    this.ex_df_imm = 0;
    this.ex_df_rd = 0;
    this.ex_df_rt = 0;
    
    // DF-DS Stage
    this.df_ds_aluOut = 0;
    this.df_ds_writeReg = 0;
    this.df_ds_memout = 0;
    this.df_ds_memtoreg = 0;
    this.df_ds_regwrite = 0;
    
    //DS-TC Stage
    this.ds_tc_aluOut = 0;
    this.ds_tc_writeReg = 0;
    this.ds_tc_memout = 0;
    this.ds_tc_memtoreg = 0;
    this.ds_tc_regwrite = 0;
    
    //TC-WB Stage
    this.tc_wb_memout = 0;
    this.tc_wb_aluOut = 0;
    this.tc_wb_writeReg = 0;
    this.tc_wb_memtoreg = 0;
    this.tc_wb_regwrite = 0;
    
    this.inst_mem = Array(256).fill(0);
    this.data_mem = Array(256).fill(0); 
    this.reg_file = Array(32).fill(0);
    this.edit = editor;
    this.srca =0;
    this.srcb =0;
    this.forwardA=0;
    this.forwardB=0;
    this.stall = 0;
    this.flush_ex_df =0;
    this.memory_stall = 0;
    this.flush_df_ds = 0;
    
    /////////////////////
    // BRANCH STUFF
    /////////////////////
    
    this.is_rf_pc = 0;
    this.pcSrc = 0;
    this.branch_taken_is_rf =0;
    this.branch_taken_if_is =0;
    this.pcBranch = 0;
    this.branchOut = 0;
    this.flush_buffer = 0;
    this.target_add = 0;
    
    
    
     // DECLARING BTB TABLE
    this.btb_table = [];
    
    // CREATING 50 ROWS
    for(i = 0 ; i < 50; i++)
        {
            this.btb_table.push(new btb_line());
        }
    
    
    // END OF BTB TABLE DECLARATION
    
    
    /////////////////////
    // END OF BRANCH STUFF
    /////////////////////
    
    
    this.rf_forwardA = 0;
    this.rf_forwardB = 0;
    this.stall_rf = 0;
    this.flush_rf_ex = 0;
    
    //PC INDEX 
    this.pc_index = document.getElementById('pc_index');
    this.clk_index = document.getElementById('clk_index');
    this.rf_table = document.getElementById('rf');
    this.mem_table = document.getElementById('mem');
    this.iram_table = document.getElementById("iram"); 
    this.num_instructions = 0;
    
    // INSTRUCTION STATUS
    
    
    this.if = 0;
    this.is = -1;
    this.rf = -1;
    this.ex = -1;
    this.df = -1;
    this.ds = -1;
    this.tc = -1;
    this.wb = -1;
    
    this.done_instructions = [];
    this.flushed_instructions = [];
    
    this.jump_now = 0;
    
    
    /// END OF INSTRUCTION STATUS
    
    
        this.check_btb = function(){
            var i=0;
            while (this.btb_table[i].valid  == 1)
            {
                if(this.btb_table[i].pc == this.if_is_pc && this.btb_table[i].valid == 1 && this.btb_table[i].predict >= 2)
                  {
                       this.branch_taken_if_is = 1;
//                      console.log("BTB TABLE PREDICTED: " + this.btb_table[i].target )
                      return (this.btb_table[i].target);
                  } 
                i++;
            }
            this.branch_taken_if_is = 0; //1st buffer;
//            console.log("BTB TABLE NORMAL: " + (this.if_is_pc + 4));
            return (this.if_is_pc + 4);
        }
        
        //2nd call add_to_btb(r1,r2 to 1st call comparator function rerturns true or false in branch out && if(brach) check comparator
        //brachout, pc, traget address
        
        this.comparator = function ()
        {
            
                if(this.rf_forwardB <= this.rf_forwardA)
                    this.branchOut = 1;
                else
                    this.branchOut= 0;
        }
        
        this.add_to_btb = function() //use tany 
        {
                if(this.branchOut == 1)
                {
                   var i =0;
                   var flag= false;
                   while(this.btb_table[i].valid  == 1)
                       {
                           if(this.btb_table[i].pc == this.is_rf_pc)
                           {
                             if(this.btb_table[i].predict <= 2)
                                (this.btb_table[i].predict)++;   
                             flag = true;
                           }   
                           i++;
                       }
                    if(!flag)
                    {
                        this.btb_table[i].pc = this.is_rf_pc;
                        this.btb_table[i].predict = 0;
                        this.btb_table[i].valid = 1;
                        this.btb_table[i].target = this.rf_ex_imm << 2 + this.is_rf_pc;
                    }
                }
            
                if(this.branchOut == 1 && this.branch_taken_is_rf == 0)
                {       
                        var newImm = parseInt(parseInt(this.rf_ex_imm) << 2);
                        var newPC =  parseInt(this.is_rf_pc)
                        this.pcBranch =  newImm + newPC ;
                        console.log("immediate: " + this.rf_ex_imm);
                        console.log("PC: " + this.is_rf_pc);
                        console.log("BRANCH IMMEDIATE: " + this.pcBranch);
                        this.pcSrc = 1;
                        this.flush_buffer = 1;
                }
                
                if(this.branchOut == 0 && this.branch_taken_is_rf == 1)
                {
                        var j = 0;
                        this.pcBranch = this.is_rf_pc + 4;
                        this.pcSrc = 0;
                        this.flush_buffer = 1;
                        while(this.btb_table[j].valid  == 1)
                        {
                           if(this.btb_table[j].pc == this.is_rf_pc)
                           {
                             if(this.btb_table[j].predict > 0)
                                (this.btb_table[j].predict)--;   
                           }   
                           j++;
                        }
                            
                }
                
        }

    
   
    
    this.assemble = function(){
        
       var lines = editor.getValue().split("\n");
       var table = document.getElementById("iram");  
       this.num_instructions = lines.length;
        
        
        for(i = 0; i < lines.length; i++){  
            actual = tobin(lines[i]);            
            hexString = ("00000000" + (actual>>>0).toString(16)).substr(-8);
            
            table.rows[i].cells[1].innerText = "0x" + hexString.toUpperCase();
            this.inst_mem[i*4] = "0x" + hexString.toUpperCase();

        }       
        
        table.rows[0].cells[2].innerText = "FETCH";
    }
    
    
    
    this.ALU = function(in_1, in_2, selector){ // ALU   
        switch(selector){
                
            case 0: return in_1 + in_2;
            case 1: return in_1 - in_2;
            case 2: return in_1 & in_2;
            case 3: return in_1 | in_2;
            case 4: return in_1 ^ in_2;
            case 5: return ((in_1 < in_2)? 1 : 0);
                
        }
    } // END OF ALU
    
   
    this.ControlUnit = function(Funct, op){ // CONTROL UNIT
        
        var RegWrite, RegDst, ALUSrc, ALUControl, Branch, MemWrite, MemtoReg, jump;
        
            // DEFAULT VALUES
            RegWrite   =  1;
            RegDst     =  1;
            ALUSrc     =  0;
            ALUControl =  1;
            Branch     =  0;
            MemWrite   =  0;
            MemtoReg   =  0;
            jump       =  0;
        
        
        switch(op){
                
            case 0: // R Instructions
                
                ALUSrc		= 0;
	        	Branch	    = 0;
	        	MemWrite	= 0;
	        	MemtoReg	= 0;
	        	RegDst		= 1;
	        	RegWrite	= 1;
	        	
                switch(Funct){
                        
                    case 32: // ADD		   
                        ALUControl	= 0;
                        break;
                        
                    case 37: // OR 
                        ALUControl	= 3;
                        break;
                        
                    case 36: // AND
                        ALUControl	= 2;
                        break;
                        
                    case 34: // SUB
                        ALUControl	= 1;
                        break;
                        
                    case 42: // SLT
                        ALUControl	= 9;
                        break;  
         
                    //COPY THIS    
                    case 8: //jr
                        jump=1;
                        RegWrite	= 0;
                        break;
                    //COPY THIS   ENDDD
                        
                        
                }
                break;
                
            case 35: // LW
                MemWrite     = 0;
				RegDst       = 0;
				MemtoReg     = 1;
				ALUControl   = 0;
				ALUSrc       = 1;
                break;
                
            case 43: // SW
                MemWrite     = 1;
				ALUControl   = 0;
				ALUSrc       = 1;
				RegWrite     = 0;
                break;
                
            case 8: // ADDI
                RegDst       = 0;
				ALUControl   = 0;
				ALUSrc       = 1;
                break;
                
            case 4: // BEQ
                Branch       = 1;
				RegWrite     = 0;
                break;
            case 6: // BLE
                Branch       = 1;
				RegWrite     = 0;
                break;
                
            case 2: // J
                 jump        = 1;
                break;
                       
        }
        
        return {
            RegWrite: RegWrite,
            RegDst: RegDst,
            ALUSrc: ALUSrc,
            ALUControl: ALUControl,
            Branch: Branch,
            MemWrite: MemWrite,
            MemtoReg: MemtoReg,
            jump:jump
        };
    } // END OF CONTROL UNIT

this.tester = function(){
    console.log(this.ALU(1,2,0));
}

this.update_rf = function(){
 
    for(i = 0 ; i < 32; i++){
        if(this.rf_table.rows[i].cells[1].innerText != this.reg_file[i]){
            this.rf_table.rows[i].cells[1].innerText = this.reg_file[i];
            this.rf_table.rows[i].classList.add("info");
        }else {
            this.rf_table.rows[i].classList.remove("info");
        }
        
    }
   
}
this.update_mem = function(){
 
    for(i = 0 ; i < 256; i++){
        
        if(this.mem_table.rows[i].cells[1].innerText != this.data_mem[i])
            {
                this.mem_table.rows[i].cells[1].innerText = this.data_mem[i]
                this.mem_table.rows[i].classList.add("info");
            }else {
                
                this.mem_table.rows[i].classList.remove("info");
                
            }
        
    }
   
}


this.Hazard_Unit = function ()
    {

        this.forwardA = this.reg_file[this.rf_ex_rs];
        this.forwardB = this.reg_file[this.rf_ex_rt];
        this.stall = 0;
        this.flush_ex_df = 0;
    
//    console.log("REG DESTINATION: " + this.ex_df_writeReg);
//    console.log("REG WRITE: " + this.ex_df_regwrite);
//    console.log("RS: " + this.rf_ex_rs);
//    console.log("RT: " + this.rf_ex_rt);
        
                if(this.rf_ex_rs != 0)
                    //forwarA: 0 (R1), 1 (this.ex_df_aluOut), 2 (this.df_ds_aluOut), 3 (this.ds_tc_aluOut), 4 (this.tc_wb_aluOut),  5 (this.ds_tc_memout), 
                    //6 (this.tc_wb_memout)
                    {
                        if (this.rf_ex_rs == this.ex_df_writeReg && this.ex_df_memtoreg == 0 && this.ex_df_regwrite == 1)
                            this.forwardA = this.ex_df_aluOut;
                        else 
                            if(this.rf_ex_rs == this.df_ds_writeReg && this.df_ds_memtoreg == 0 && this.df_ds_regwrite == 1)
                                this.forwardA = this.df_ds_aluOut;
                        else
                            if(this.rf_ex_rs == this.ds_tc_writeReg && this.ds_tc_memtoreg == 0 && this.ds_tc_regwrite == 1)
                                this.forwardA = this.ds_tc_aluOut;
                        else
                            if(this.rf_ex_rs == this.tc_wb_writeReg && this.tc_wb_memtoreg == 0 && this.tc_wb_regwrite == 1)
                            this.forwardA = this.tc_wb_aluOut;
                        else
                            if(this.rf_ex_rs == this.ex_df_writeReg && this.ex_df_memtoreg == 1 && this.ex_df_regwrite == 1)
                              {
                                 this.stall = 1;
                                 this.flush_ex_df = 1;
                              }  
                        else 
                            if(this.rf_ex_rs == this.df_ds_writeReg && this.df_ds_memtoreg == 1 && this.df_ds_regwrite == 1)
                              {
                                 this.stall = 1;
                                 this.flush_ex_df = 1;
                              } 
                        else
                            if(this.rf_ex_rs == this.ds_tc_writeReg && this.ds_tc_memtoreg == 1 && this.ds_tc_regwrite == 1)
                            this.forwardA = this.ds_tc_memout;
                        else
                            if(this.rf_ex_rs == this.tc_wb_writeReg && this.tc_wb_memtoreg == 1 && this.tc_wb_regwrite == 1)
                            this.forwardA = this.tc_wb_memout;
                        else
                            this.forwardA = this.reg_file[this.rf_ex_rs];
                    }   
    
    
            if(this.rf_ex_alu_src == 0)
                {
                if(this.rf_ex_rt != 0)
                    {
                        //forwarB: 0 (R2), 1 (immediate), 2 (this.ex_df_aluOut), 3 (this.df_ds_aluOut), 4 (this.ds_tc_aluOut), 5 (this.tc_wb_aluOut), 
                        //6 (this.ds_tc_memout), 7 (this.tc_wb_memout)
                        if(this.rf_ex_rt == this.ex_df_writeReg && this.ex_df_memtoreg == 0 && this.ex_df_regwrite == 1)
                            this.forwardB = this.ex_df_aluOut;
                        else 
                            if(this.rf_ex_rt == this.df_ds_writeReg && this.df_ds_memtoreg == 0 && this.df_ds_regwrite == 1)
                                this.forwardB = this.df_ds_aluOut;
                        else
                            if(this.rf_ex_rt == this.ds_tc_writeReg && this.ds_tc_memtoreg == 0 && this.ds_tc_regwrite == 1)
                                this.forwardB = this.ds_tc_aluOut;
                        else
                            if(this.rf_ex_rt == this.tc_wb_writeReg && this.tc_wb_memtoreg == 0 && this.tc_wb_regwrite == 1)
                                this.forwardB = this.tc_wb_aluOut;
                        else
                            if(this.rf_ex_rt == this.ex_df_writeReg && this.ex_df_memtoreg == 1 && this.ex_df_regwrite == 1)
                              {
                                 this.stall = 1;
                                 this.flush_ex_df = 1;
                              }
                        else 
                            if(this.rf_ex_rt == this.df_ds_writeReg && this.df_ds_memtoreg == 1 && this.df_ds_regwrite == 1)
                              {
                                 this.stall = 1;
                                 this.flush_ex_df = 1;
                              }
                        else
                            if(this.rf_ex_rt == this.ds_tc_writeReg && this.ds_tc_memtoreg == 1 && this.ds_tc_regwrite == 1)
                                this.forwardB = this.ds_tc_memout;
                        else
                            if(this.rf_ex_rt == this.tc_wb_writeReg && this.tc_wb_memtoreg == 1 && this.tc_wb_regwrite == 1)
                                this.forwardB = this.tc_wb_memout;
                        else
                            this.forwardB = this.reg_file[this.rf_ex_rt];
                    }   
            }
        else
            this.forwardB = this.rf_ex_imm;
    }


this.update_iram = function(){
    
    
//    console.log(this.num_instructions);
    if(this.if != -1 && (this.if/4) < this.num_instructions)
    this.iram_table.rows[this.if/4].cells[2].innerText = "INST. FETCH";
    
    if(this.is != -1 && (this.is/4) < this.num_instructions)
    this.iram_table.rows[this.is/4].cells[2].innerText = "INST. SELECT";
    
    if(this.rf != -1 && (this.rf/4) < this.num_instructions)
    this.iram_table.rows[this.rf/4].cells[2].innerText = "DECODE";
    
    if(this.ex != -1 && (this.ex/4) < this.num_instructions)
    this.iram_table.rows[this.ex/4].cells[2].innerText = "EXECUTE";
    
    if(this.df != -1 && (this.df/4) < this.num_instructions)
    this.iram_table.rows[this.df/4].cells[2].innerText = "DATA FETCH";
    
    if(this.ds != -1 && (this.ds/4) < this.num_instructions)
    this.iram_table.rows[this.ds/4].cells[2].innerText = "DATA SELECT";
    
    if(this.tc != -1 && (this.tc/4) < this.num_instructions)
    this.iram_table.rows[this.tc/4].cells[2].innerText = "TAG CHECK";
    
    if(this.wb != -1 && (this.wb/4) < this.num_instructions)
    this.iram_table.rows[this.wb/4].cells[2].innerText = "WRITE BACK";
    
    
    for(i = 0 ; i <this.done_instructions.length ; i++){
        if(this.done_instructions[i] != -1 && (this.done_instructions[i]/4) < this.num_instructions)
            this.iram_table.rows[this.done_instructions[i]/4].cells[2].innerText = "DONE";
     }    
    
    for(i = 0 ; i <this.flushed_instructions.length ; i++){
        if(this.flushed_instructions[i] != -1 && (this.flushed_instructions[i]/4) < this.num_instructions)
            this.iram_table.rows[this.flushed_instructions[i]/4].cells[2].innerText = "FLUSHED";
    }
        
    this.done_instructions = [];
    this.flushed_instructions = [];
}

this.step = function(){
        
//        console.log(this.btb_table[0]);
    
        this.clk++;
        this.clk_index.innerText = "Clock: " + this.clk;

        this.done_instructions.push(this.wb);
        
        this.wb = this.tc;
    
         //writing back in register file
        if(this.tc_wb_regwrite)
            if(this.tc_wb_writeReg!=0)
                this.reg_file[this.tc_wb_writeReg] = (this.tc_wb_memtoreg)? this.tc_wb_memout:this.tc_wb_aluOut ;
            else
                this.reg_file[this.tc_wb_writeReg] = 0;
        
    
            this.update_rf();
    
    
        this.Hazard_Unit();
    
        
       
    
        /////////////////////////////////
        // MEMORY DATA HAZARDS
        /////////////////////////////////
        
        
        // NOT YET FINISHED
        
        this.memory_stall = 0;
        this.flush_df_ds = 0;
        
    
        this.ex_df_writeData = this.reg_file[this.ex_df_rt];
        
        if(this.ex_df_rt == this.df_ds_writeReg && this.df_ds_regwrite == 1 
           && this.df_ds_memtoreg == 0)
            this.ex_df_writeData = this.df_ds_aluOut;
    
        else if(this.ex_df_rt == this.ds_tc_writeReg && this.ds_tc_regwrite == 1 
           && this.ds_tc_memtoreg == 0)
            this.ex_df_writeData = this.ds_tc_aluOut;
    
        else if(this.ex_df_rt == this.tw_wb_writeReg && this.tw_wb_regwrite == 1 
           && this.tw_wb_memtoreg == 0)
            this.ex_df_writeData = this.tw_wb_aluOut;
    
        else if(this.ex_df_rt == this.df_ds_writeReg && this.df_ds_regwrite == 1 
           && this.df_ds_memtoreg == 1){
            
            this.memory_stall = 1;
            this.flush_df_ds = 1;
        }
    
        else if(this.ex_df_rt == this.ds_tc_writeReg && this.ds_tc_regwrite == 1 
           && this.ds_tc_memtoreg == 1)
            this.ex_df_writeData = this.ds_tc_memout;
        
    
        else if(this.ex_df_rt == this.tc_wb_writeReg && this.tc_wb_regwrite == 1 
           && this.tc_wb_memtoreg == 1){
            this.ex_df_writeData = this.tc_wb_memout;

        }
            
            
    
        
    
        /////////////////////////////////
        // END OF MEMORY DATA HAZARDS
        /////////////////////////////////  
       

    
        
        this.tc = this.ds;
    
        //buffer for tc-wb
        this.tc_wb_aluOut = this.ds_tc_aluOut;
        this.tc_wb_memout = this.ds_tc_memout;  
        this.tc_wb_writeReg = this.ds_tc_writeReg;
        this.tc_wb_memtoreg =this.ds_tc_memtoreg;
        this.tc_wb_regwrite = this.ds_tc_regwrite;
        
        
        this.ds = this.df;
    
        //buffer for ds-tc
        this.ds_tc_aluOut = this.df_ds_aluOut;
        this.ds_tc_memout = this.data_mem[this.df_ds_aluOut];  
        this.ds_tc_writeReg = this.df_ds_writeReg;
        this.ds_tc_memtoreg = this.df_ds_memtoreg;
        this.ds_tc_regwrite = this.df_ds_regwrite;
        
    
         
        
    

    
        if(this.flush_df_ds == 1){
            
        this.df_ds_aluOut =  0;   
        this.df_ds_writeReg = 0;
        this.df_ds_memtoreg = 0;
        this.df_ds_regwrite = 0;
        
            
//        this.ds = -1;
            
            
        }
    
        if(this.memory_stall == 0){
            
//        console.log("NOT STALLING");
//        console.log("")
        if(this.ex_df_memwrite)
            this.data_mem[this.ex_df_aluOut] = this.ex_df_writeData;
    
        this.update_mem();
        
            
            
        //buffer for df-ds
        this.df_ds_aluOut =  this.ex_df_aluOut;   
        this.df_ds_writeReg = this.ex_df_writeReg;
        this.df_ds_memtoreg = this.ex_df_memtoreg;
        this.df_ds_regwrite = this.ex_df_regwrite;
        
        
    
        ///////////////////////////////
        // FORWARDING  
        ///////////////////////////////
        

            this.srca = this.forwardA;
            this.srcb = this.forwardB;

        ///////////////////////////////
        // END OF FORWARDING  
        ///////////////////////////////
    
        
//        if(this.stall == 0)
        this.df = this.ex;
        

       
            
        //calling alu-function
        this.ex_df_aluOut = this.ALU(this.srca, this.srcb, this.rf_ex_alu_funct);
        this.ex_df_writeReg = (this.rf_ex_regdst)? this.rf_ex_rd : this.rf_ex_rt;        
        //buffer for ex-df
        this.ex_df_alu_funct = this.rf_ex_alu_funct;
        this.ex_df_alu_src = this.rf_ex_alu_src;
        this.ex_df_regdst = this.rf_ex_regdst;
        this.ex_df_memwrite = this.rf_ex_memwrite;
        this.ex_df_regwrite = this.rf_ex_regwrite;
        this.ex_df_memtoreg = this.rf_ex_memtoreg;
        this.ex_df_imm = this.rf_ex_imm;
        this.ex_df_r1 = this.rf_ex_r1;
        this.ex_df_r2 = this.rf_ex_r2;
        this.ex_df_rd = this.rf_ex_rd;
        this.ex_df_rt = this.rf_ex_rt;
        this.ex_df_writeData = this.rf_ex_r2;
    
    
        
        ///////////////////////////////
        // if FLUSH EX DF
        // FLUSH IT
        ///////////////////////////////
    if( this.flush_ex_df == 1)
     {   this.ex_df_aluOut =0;
        this.ex_df_writeReg = 0;        
        //buffer for ex-df
        this.ex_df_alu_funct = 0;
        this.ex_df_alu_src = 0;
        this.ex_df_regdst = 0;
        this.ex_df_memwrite = 0;
        this.ex_df_regwrite = 0;
        this.ex_df_memtoreg = 0;
        this.ex_df_imm = 0;
        this.ex_df_r1 = 0;
        this.ex_df_r2 = 0;
        this.ex_df_rd =0;
        this.ex_df_rt = 0;        
        this.ex_df_writeData = 0;
      
      
//        this.df = -1;

    }
        
    
    
        ///////////////////////////////
        // STALL EVERYTHING BELOW 
        ///////////////////////////////
    
    if(this.stall == 0)
    {    
        
        
        this.ex = this.rf;

        
        if(this.is_rf_instruction == 0)
            this.is_rf_instruction = "0x00000000";
    
        
        var s_instr=   this.is_rf_instruction.split("0x");

        var temp = s_instr[1].split("");
        var imm = parseInt(temp[4]+temp[5]+temp[6]+temp[7], 16), adr=(parseInt(temp[1]+temp[2]+temp[3]+temp[4]+temp[5]+temp[6]+temp[7], 16))&16777215; 
        var op= parseInt(temp[0]+temp[1], 16)>>2, rs=(parseInt(temp[1]+temp[2], 16)&63)>>1,  rt=(parseInt(temp[2]+temp[3], 16)&31);
        var rd= parseInt(temp[4]+temp[5], 16)>>3, shamt=(parseInt(temp[5]+temp[6], 16)&127)>>2, funct=(parseInt(temp[6]+temp[7], 16)&63);
        
        console.log("RS: " +  rs);
        console.log("RT: " +  rt);
     
        //call CU
        var cu = this.ControlUnit(funct,op);
        

        this.rf_forwardA = this.reg_file[rs];
        this.rf_forwardB = this.reg_file[rt];
        this.stall_rf = 0;
        this.flush_rf_ex = 0;
        
        
        this.rf_ex_writeReg = (this.rf_ex_regdst)? this.rf_ex_rd : this.rf_ex_rt; 
        if(cu.jump == 1 || cu.Branch == 1){
        
        if(rs != 0){
            
        if(rs == this.ex_df_writeReg && this.ex_df_regwrite == 1 && this.ex_df_memtoreg ==0)
            this.rf_forwardA = this.ex_df_aluOut;
        if(rs == this.df_ds_writeReg && this.df_ds_regwrite == 1 && this.df_ds_memtoreg ==0)
            this.rf_forwardA = this.df_ds_aluOut;
        if(rs == this.ds_tc_writeReg && this.ds_tc_regwrite == 1 && this.ds_tc_memtoreg ==0)
            this.rf_forwardA = this.ds_tc_aluOut;
        if(rs == this.tc_wb_writeReg && this.tc_wb_regwrite == 1 && this.tc_wb_memtoreg ==0)
            this.rf_forwardA = this.tc_wb_aluOut;
       
        }
       
        if(rt != 0){
        if(rt == this.ex_df_writeReg && this.ex_df_regwrite == 1 && this.ex_df_memtoreg ==0)
            this.rf_forwardB = this.ex_df_aluOut;
        if(rt == this.df_ds_writeReg && this.df_ds_regwrite == 1 && this.df_ds_memtoreg ==0)
            this.rf_forwardB = this.df_ds_aluOut;
        if(rt == this.ds_tc_writeReg && this.ds_tc_regwrite == 1 && this.ds_tc_memtoreg ==0)
            this.rf_forwardB = this.ds_tc_aluOut;
        if(rt == this.tc_wb_writeReg && this.tc_wb_regwrite == 1 && this.tc_wb_memtoreg ==0)
            this.rf_forwardB = this.tc_wb_aluOut;
        }
        
        if(((rs == this.rf_ex_writeReg && rs != 0) || (rt == this.rf_ex_writeReg && rt != 0)) && this.rf_ex_regwrite == 1 && this.rf_ex_memtoreg ==0 )
            {
                if(cu.Branch == 1 || (cu.jump == 1 && op==0 && funct==8)){
                     this.stall_rf = 1;
                    this.flush_rf_ex = 1;
                }
           
            }
        
        }
        
//        console.log("RS:" + rs);
//        console.log("WRITE REG:" + this.rf_ex_writeReg );
//        console.log("REG WRITE:" + this.rf_ex_regwrite);
//        console.log("MEM TO REG:" + this.rf_ex_memtoreg);

        //update buffer  
        this.rf_ex_r1 = this.reg_file[rs];
        this.rf_ex_r2 = this.reg_file[rt];
        this.rf_ex_rd = rd;
        this.rf_ex_rt = rt;
        this.rf_ex_imm = imm;
        this.rf_ex_rs = rs;
        this.rf_ex_regwrite= cu.RegWrite;
        this.rf_ex_memtoreg= cu.MemtoReg;
        this.rf_ex_memwrite= cu.MemWrite;
        this.rf_ex_alu_funct= cu.ALUControl;
        this.rf_ex_alu_src= cu.ALUSrc;
        this.rf_ex_regdst= cu.RegDst;
        this.rf_ex_jump=cu.jump;
        
        
        this.pcSrc = 0;
        this.flush_buffer = 0;
        
        var temp_btb = this.check_btb();
        
        console.log("forward a: " + this.rf_forwardA);
        console.log("forward b: " + this.rf_forwardB);
        if(cu.Branch == 1){
            var c = this.comparator ();
            var add = this.add_to_btb();
        }
        
        
        
        if(this.flush_rf_ex == 1){
            
        this.rf_ex_r1 = 0;
        this.rf_ex_r2 = 0;
        this.rf_ex_rd = 0;
        this.rf_ex_rt = 0;
        this.rf_ex_imm = 0;
        this.rf_ex_rs = 0;
        this.rf_ex_regwrite= 0;
        this.rf_ex_memtoreg= 0;
        this.rf_ex_memwrite= 0;
        this.rf_ex_alu_funct= 0;
        this.rf_ex_alu_src= 0;
        this.rf_ex_regdst= 0;
        this.rf_ex_jump=0;
            
        }
        
        
       
        
        //fetch
        
        
        
         if(cu.jump == 1)
            {
                if(op==2)
                    this.jump_now = 1; //new pc
                else if(op==0&&funct==8)
                    this.jump_now = 2;  
                //flush 
            }    
       
        
        if(this.stall_rf == 0){
        
//        console.log("NOT STALLING RF");
        this.rf = this.is;

        this.is = this.if;

        // IS-RF Stage
        
        this.is_rf_instruction = this.inst_mem[this.if_is_pc] ;    
        this.is_rf_pc = this.if_is_pc;
        this.branch_taken_is_rf = this.branch_taken_if_is;

        
        if(this.jump_now == 1 || this.jump_now == 2 || this.flush_buffer == 1){
            
            this.is_rf_instruction="0";
            this.flushed_instructions.push(this.is_rf_pc);
            this.is = -1;
            
        }
            
        
        
        
        
        
        if(this.jump_now == 0 && this.pcSrc != 1){
                
            this.if_is_pc = temp_btb;
//            console.log("NORMAL: " + this.if_is_pc);

        }
        else if(this.jump_now == 1 && this.pcSrc != 1){
                
            this.if_is_pc = adr * 4; //new pc
//            console.log("NORMAL JUMP: " + this.if_is_pc);
        }
        else if(this.jump_now == 2 && this.pcSrc != 1){
            
            this.if_is_pc=this.rf_forwardA*4; 
//            console.log("JUMP REGISTER: " + this.if_is_pc);
        }
        else if (this.pcSrc == 1){

            this.if_is_pc = this.pcBranch;
//            console.log("BRANCH NOT PREDICTED: " + this.if_is_pc);
        }
  
    
        
        this.jump_now = 0;
        
        this.if = this.if_is_pc;
        
        this.pc_index.innerText = "PC: " + this.if_is_pc;
        
            }
        }
            
    }
    
    this.update_iram();
    
//    console.log("BUFFER 1 BRANCH TAKEN: " + this.branch_taken_if_is);
//    console.log("BUFFER 2 BRANCH TAKEN: " + this.branch_taken_is_rf);
        
 };
} 
var assemble_button = document.getElementById('assemble_button');
var next_button = document.getElementById('next_button');
var cpu = new CPU();

assemble_button.onclick = function() {
//    assemble();
    
    cpu.assemble();
}

next_button.onclick = function(){
    cpu.step();
}