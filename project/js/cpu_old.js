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
function CPU(){ 
    
    
    // IF-IS Stage 
    this.if_is_pc = 0;
    this.if_is_pc_plus4= 0;
    
    // IS-RF Stage
    this.is_rf_instruction = "0x00000000" ;
    this.is_rf_pc_plus4 = 0;
    
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
    
    //PC INDEX 
    this.pc_index = document.getElementById('pc_index');
    this.rf_table = document.getElementById('rf');
    
    this.assemble = function(){
        
       var lines = editor.getValue().split("\n");
       var table = document.getElementById("iram");  
    
        for(i = 0; i < lines.length; i++){  
            actual = tobin(lines[i]);
//            this.inst_mem[i*4] = actual;
            
            hexString = ("00000000" + (actual>>>0).toString(16)).substr(-8);
            
            table.rows[i].cells[1].innerText = "0x" + hexString.toUpperCase();
            this.inst_mem[i*4] = "0x" + hexString.toUpperCase();

//            console.log(hexString);
//            hexNum = parseInt(hexString, 16);
//            console.log(hexNum);
        }       
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
        
        this.rf_table.rows[i].cells[1].innerText = this.reg_file[i];
        
    }
   
}
this.step = function(){
    
       
    
        //writing back in register file
        if(this.tc_wb_regwrite)
            if(this.tc_wb_writeReg!=0)
                this.reg_file[this.tc_wb_writeReg] = (this.tc_wb_memtoreg)? this.tc_wb_memout:this.tc_wb_aluOut ;
            else
                this.reg_file[this.tc_wb_writeReg] = 0;
        
    
    
        //buffer for tc-wb
        this.tc_wb_aluOut = this.ds_tc_aluOut;
        this.tc_wb_memout = this.ds_tc_memout;  
        this.tc_wb_writeReg = this.ds_tc_writeReg;
        this.tc_wb_memtoreg =this.ds_tc_memtoreg;
        this.tc_wb_regwrite = this.ds_tc_regwrite;
        
    
    
    
        //buffer for ds-tc
        this.ds_tc_aluOut = this.df_ds_aluOut;
        this.ds_tc_memout = this.df_ds_memout;  
        this.ds_tc_writeReg = this.df_ds_writeReg;
        this.ds_tc_memtoreg = this.df_ds_memtoreg;
        this.ds_tc_regwrite = this.df_ds_regwrite;
        
    
    
        //accessing data memory
        if(this.ex_df_memwrite)
            this.data_mem[this.df_ds_aluOut] = this.ex_df_writeData;
        else
            this.df_ds_memout = this.data_mem[this.df_ds_aluOut];
        //buffer for df-ds
        this.df_ds_aluOut =  this.ex_df_aluOut;   
        this.df_ds_memout = this.df_ds_memout;
        this.df_ds_writeReg = this.ex_df_writeReg;
        this.df_ds_memtoreg = this.ex_df_memtoreg;
        this.df_ds_regwrite = this.ex_df_regwrite;
        

    
    
    
       
    

        //choosing source b
//        this.ex_df_srcb = (this.ex_df_alu_src)? this.ex_df_imm : this.ex_df_writeData       
//        if(this.forwardB == 0)
//            this.ex_df_writeData = this.ex_df_r2;
//        else
//            if(this.forwardB == 1)
//                this.ex_df_writeData = (this.tc_wb_memtoreg)? this.tc_wb_memout:this.tc_wb_aluOut;
//                else
//                    if(this.forwardB == 2)
//                        this.ex_df_writeData = this.df_ds_aluOut ;
//        
//        //choosing source a
//        if(this.forwardA == 0)
//            this.srca = this.ex_df_r2;
//        else
//            if(this.forwardA == 1)
//                this.srca = (this.tc_wb_memtoreg)? this.tc_wb_memout:this.tc_wb_aluOut;
//                else
//                    if(this.forwardA == 2)
//                        this.srca = this.df_ds_aluOut ;
//        
//        
    
    
    
        ///////////////////////////////
        // FORWARDING  
        ///////////////////////////////
    
        
        this.srca = this.rf_ex_r1;
        this.srcb = (this.rf_ex_alu_src)?  this.rf_ex_imm : this.rf_ex_r2 ;

        ///////////////////////////////
        // END OF FORWARDING  
        ///////////////////////////////
    
    
    
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
    
    
        
        ///////////////////////////////
        // if FLUSH EX DF
        // FLUSH IT
        ///////////////////////////////
    
        
        
    
    
        ///////////////////////////////
        // STALL EVERYTHING BELOW 
        ///////////////////////////////
    
    
        if(this.is_rf_instruction == 0)
            this.is_rf_instruction = "0x00000000";
    
    
        var s_instr=   this.is_rf_instruction.split("0x");

        var temp = s_instr[1].split("");
        var imm = parseInt(temp[4]+temp[5]+temp[6]+temp[7], 16), adr=(parseInt(temp[1]+temp[2]+temp[3]+temp[4]+temp[5]+temp[6]+temp[7], 16))&16777215; 
        var op= parseInt(temp[0]+temp[1], 16)>>2, rs=(parseInt(temp[1]+temp[2], 16)&63)>>1,  rt=(parseInt(temp[2]+temp[3], 16)&31);
        var rd= parseInt(temp[4]+temp[5], 16)>>3, shamt=(parseInt(temp[5]+temp[6], 16)&127)>>2, funct=(parseInt(temp[6]+temp[7], 16)&63);

     
        //call CU
        var cu = this.ControlUnit(funct,op);

      

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

        //fetch
    
        // IS-RF Stage
        this.is_rf_instruction = this.inst_mem[this.if_is_pc] ;    
    
        this.if_is_pc = this.if_is_pc + 4;   
        this.pc_index.innerText = "PC: " + this.if_is_pc;
        this.update_rf();
        
};
} 
var assemble_button = document.getElementById('assemble_button');

assemble_button.onclick = function() {
    assemble();
}